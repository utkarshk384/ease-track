/* Utils */
import { getDetail } from "../controllers/package";
import { intervalToDuration } from "date-fns";

/* Types */
import type { prisma as Prisma } from "../../db/client";

export const DetectCourier = (trackingId: string) => {
  if (trackingId.includes("FMP")) return "EKART";

  if (trackingId[0] === "U") return "DTDC";

  if (trackingId[0] === "R") return "FEDEX";

  return "UNKNOWN";
};

export const RefetchPackages = async (
  userId: string,
  prisma: typeof Prisma
) => {
  const packages = await prisma.package.findMany({
    where: {
      userId,
    },
  });

  const now = new Date();
  const REFTECH_HOURS = parseInt(process.env.REFETCH_HOURS as string);

  packages.forEach(async (pkg) => {
    const hours = intervalToDuration({
      start: pkg.updatedAt,
      end: now,
    }).hours as number;

    if (hours < REFTECH_HOURS) return;

    try {
      const details = await getDetail(pkg);
      if (details.length > 0)
        await prisma.package.update({
          where: {
            id: pkg.id,
          },
          data: {
            details,
          },
        });
    } catch (e) {}
  });

  return true;
};
