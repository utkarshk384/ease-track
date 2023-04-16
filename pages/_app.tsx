/* Backend Integration */
import { trpc } from "src/utils/trpc";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/* Css */
import "src/styles/globals.css";

/* Types */
import type { AppProps } from "next/app";
import type { NextPageLayout } from "src/types";

export type AppPropsWithLayout = AppProps & {
  Component: NextPageLayout;
};

const MyApp: React.FC<AppPropsWithLayout> = (props) => {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
};

export default trpc.withTRPC(MyApp);
