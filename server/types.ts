import type { Package } from "@prisma/client";

export type DetailedPackageType = Package & {
  details: TransformerDataType[];
};

export type TransformerDataType = {
  status: string;
  date: string;
  place: string;
};
