import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

export type NextPageLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
