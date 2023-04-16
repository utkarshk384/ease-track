import React, { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

/* Components */
import { Button } from "components/button";
import { CopyToClipboard, TrashIcon } from "components/icons";

/* Hooks */
import { useClipboard } from "src/hooks";

/* Types */
import type { DetailedPackageType } from "server/types";
import { FormatDate, ParseISO } from "src/utils/date";
import { trpc } from "src/utils/trpc";

type Props = {
  children?: React.ReactNode;
  pkg: DetailedPackageType;
  url: string;
};

export const PackageItem: React.FC<Props> = (props) => {
  const { pkg: Package, url } = props;

  /* Queries */
  const deletePackage = trpc.packages.deleteByTrackingId.useMutation();

  /* Router */
  const router = useRouter();

  /* Memo */
  const pkg = useMemo(() => {
    if (Package.details.length === 0)
      Package.details[0] = {
        date: new Date().toISOString(),
        status: "Invalid Tracking ID",
        place: "",
      };

    return Package;
  }, [Package]);

  const { imgUrl, date } = useMemo(() => {
    return {
      imgUrl: `/logos/${pkg.delivery_partner.toLowerCase()}.png`,
      date: pkg.details[0]?.date
        ? FormatDate(ParseISO(pkg.details[0]?.date), "MMM dd yyy hh:mmaaa")
        : "",
    };
  }, [pkg.delivery_partner, pkg.details]);

  /* Hooks */
  const [, copy] = useClipboard();
  const trpcUtils = trpc.useContext();

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] justify-items-end rounded-lg bg-primary px-8 py-2 text-secondary">
      <div className="flex items-center gap-4 justify-self-start">
        <Image
          className="overflow-hidden rounded-lg"
          width={40}
          height={42}
          src={imgUrl}
          alt="Logos"
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-paragraph font-bold">{pkg.details[0]?.status}</h3>
          <p className="text-paragraph">{date}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-self-start">
        <p className="text-paragraph">{pkg.tracking_id}</p>
        <button
          onClick={() => {
            copy(pkg.tracking_id);
          }}
        >
          <CopyToClipboard />
        </button>
      </div>
      <div className="flex items-center gap-2">
        {pkg.details[0]?.status !== "Invalid Tracking ID" && (
          <Button
            onClick={() => router.push("/[trackingid]", url, { shallow: true })}
          >
            View Details
          </Button>
        )}
        <button
          className="rounded-lg bg-red-500 p-2.5"
          onClick={() => {
            deletePackage.mutateAsync(pkg.tracking_id).then(() => {
              if (deletePackage.status !== "error")
                trpcUtils.packages.getAll.invalidate();
            });
          }}
        >
          <TrashIcon stroke="#FFFFFF" />
        </button>
      </div>
    </div>
  );
};
