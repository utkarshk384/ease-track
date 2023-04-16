import Head from "next/head";
import { v4 as uuid } from "uuid";
import { useMemo, useEffect } from "react";

/* Query Client */
import { trpc } from "src/utils/trpc";

/* Component */
import { Card } from "components/card";
import { Navbar } from "layout/navbar";
import { BackgroundLayout } from "layout";
import { SearchBar } from "components/searchBar";
import { PackageItem } from "components/packageItem";

/* Consts */
import { DELIVERY_PARTNER_DESC } from "src/consts";

/* Types */
import type { NextPageLayout } from "src/types";
import { useCookie } from "src/hooks";
import { LoadingTruckAnimation } from "layout/truckLoading";
import { EmptyAnimation } from "layout/emptyAnimation";

const Home: NextPageLayout = () => {
  /* Hooks */
  const { getCookie, setCookie } = useCookie();
  const user = getCookie("USER");

  /* Memos */
  const cards = useMemo(() => DELIVERY_PARTNER_DESC, []);

  /* Querys */
  const { data, isLoading } = trpc.packages.getAll.useQuery({ userId: user });

  /* Effects */
  useEffect(() => {
    if (!user)
      setCookie({
        name: "USER",
        value: uuid(),
      });
  }, [setCookie, user]);

  return (
    <div className="h-full flex-col gap-4">
      <div className="mx-auto mb-20 flex w-11/12 flex-col text-primary">
        <div className="mt-[10%] flex flex-col gap-2">
          <h1 id="track" className="text-h1 font-bold">
            Multi-Package Tracking
          </h1>
          <p className="text-paragraph">
            An all-in-one solution for all your packages.
          </p>
        </div>
        <div className="mt-6">
          <SearchBar userId={user} />
        </div>
        <div className="mt-20">
          <h2 id="packages" className="text-h2 font-bold">
            Your Packages
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            {isLoading && <LoadingTruckAnimation />}
            {!isLoading &&
              data?.map((item: any, i) => (
                <PackageItem
                  key={`${i}-package-item`}
                  pkg={item}
                  url={`/${item.id}`}
                />
              ))}
            {data?.length === 0 && <EmptyAnimation />}
          </div>
        </div>
        <div className="mt-20">
          <h2 id="supported-partners" className="text-h2 font-bold">
            Supported Partners
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <Card key={`${i}-card`} {...card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return (
    <>
      <Head>
        <title>Ease Track | Home</title>
      </Head>
      <BackgroundLayout>
        <Navbar />
        {page}
      </BackgroundLayout>
    </>
  );
};

export default Home;
