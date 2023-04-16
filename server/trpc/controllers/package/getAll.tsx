import { AxiosWrapper } from "server/axios";
import fs from "fs";

/* Transformers */
import { EKartTransformer, DTDCTransformer } from "server/trpc/helpers";

/* Consts */
import { URLS } from "src/consts";

/* Types */
import type { Package } from "@prisma/client";
import type { DetailedPackageType, TransformerDataType } from "server/types";

export const getDetails = async (
  packages: Package[]
): Promise<DetailedPackageType[]> => {
  return Promise.all(
    packages.map(async (pkg) => {
      const details = await getDetail(pkg);
      return {
        ...pkg,
        details,
      };
    })
  );
};

export const getDetail = async (
  pkg: Package
): Promise<TransformerDataType[]> => {
  const url = URLS[pkg.delivery_partner] as string; // Undefined is already handled in router/packages.ts - add procedure
  let details: TransformerDataType[] = [];

  const requestDefaults = {
    method: "POST" as const,
    url,
    skipCors: true,
    headers: {
      origin: "http://localhost:3000",
    },
    defaultHeaders: true,
  };

  let res: unknown = null;

  try {
    switch (pkg.delivery_partner) {
      case "EKART":
        res = await AxiosWrapper<unknown>({
          ...requestDefaults,

          body: { trackingId: pkg.tracking_id },
        });

        details = EKartTransformer(res);
        break;

      case "DTDC":
        res = await AxiosWrapper<unknown>({
          ...requestDefaults,
          url: requestDefaults.url.replace("<id>", pkg.tracking_id),
        });

        details = DTDCTransformer(res);
        break;
    }
  } catch (e: any) {
    if(Object.keys(e).length > 0)
      fs.writeFileSync(
        `error${Math.random() * 0.3}.json`,
        JSON.stringify(e, null, 2)
        );
  }

  return details;
};
