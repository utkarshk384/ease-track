import React, { useMemo } from "react";

/* Layouts */
import { BackgroundLayout, Navbar } from "layout";

/* Types */
import type { NextPageLayout } from "src/types";
import { Button } from "components/button";
import { ChevronIcon, TrashIcon } from "components/icons";
import { useRouter } from "next/router";
import { TrackedItem } from "components/tracketItem";
import { trpc } from "src/utils/trpc";
import { LoadingTruckAnimation } from "layout/truckLoading";
import { FormatDate, ParseISO } from "src/utils/date";

/* Types */
import type { NextRouter } from "next/router";
import type { DetailedPackageType } from "server/types";
import { useCookie } from "src/hooks";

type Props = {
  children?: React.ReactNode;
};

type TitleBarProps = {
  router: NextRouter;
  trackingId: string;
  deletePackage: ReturnType<
    typeof trpc.packages.deleteByTrackingId.useMutation
  >;
};

const TrackedPackage: NextPageLayout<Props> = (props) => {
  const {} = props;

  /* Hooks */
  const { getCookie } = useCookie();

  /* Router */
  const router = useRouter();

  /* Memos */
  const id = useMemo(() => {
    if (router.query?.itemid) return router.query?.itemid as string;
    return "";
  }, [router.query?.itemid]);

  /* Querys */
  const { isLoading, data, isError } = trpc.packages.getById.useQuery<
    boolean,
    DetailedPackageType
  >({ id, userId: getCookie("USER") });
  const deletePackage = trpc.packages.deleteByTrackingId.useMutation();

  return (
    <div
      className={`mx-auto flex w-11/12 flex-col gap-4 py-10 ${
        isLoading || isError ? "h-screen" : ""
      }`}
    >
      <Button className="text-secondary" onClick={() => router.push("/")}>
        <ChevronIcon className=" rotate-90" /> Back
      </Button>
      <div className="relative overflow-hidden rounded-lg bg-primary text-secondary">
        {!isLoading && !isError && (
          <>
            <TitleBar
              deletePackage={deletePackage}
              router={router}
              trackingId={data?.tracking_id as string}
            />
            <div className="shadow-tracking-line absolute left-1/3 h-full w-[2px] bg-black" />
          </>
        )}

        {isError && (
          <div className="flex flex-col gap-8 px-10 py-10">
            <h2 className="text-sub-heading">
              An error occurred! Please try again
            </h2>
            <Button onClick={() => router.reload()}>Reload</Button>
          </div>
        )}

        {isLoading && (
          <LoadingTruckAnimation wrapperClassName="text-secondary pt-10" />
        )}

        <div className="flex flex-col gap-8 px-10 py-10">
          {!isLoading &&
            !isError &&
            data?.details.map((item, i) => (
              <TrackedItem
                key={`item-${item.place}-${i}`}
                date={FormatDate(ParseISO(item.date), "eeee, MMMM dd, yyy")}
                time={FormatDate(ParseISO(item.date), "hh:mmaaa")}
                status={item.status}
                place={item.place}
                deliveryPartner={data.delivery_partner}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const TitleBar: React.FC<TitleBarProps> = (props) => {
  const { trackingId, router, deletePackage } = props;

  return (
    <div className="flex justify-between border-b-2 border-black py-6 px-10">
      <p className="text-sub-heading font-bold">
        Tracking ID: <span className="font-normal">{trackingId}</span>
      </p>
      <button
        className="rounded-lg bg-red-500 p-2.5"
        onClick={() => {
          deletePackage.mutateAsync(trackingId).then(() => {
            if (deletePackage.status !== "error") router.push("/");
          });
        }}
      >
        <TrashIcon stroke="#FFFFFF" />
      </button>
    </div>
  );
};

TrackedPackage.getLayout = (page) => {
  return (
    <BackgroundLayout>
      <Navbar />
      {page}
    </BackgroundLayout>
  );
};

export default TrackedPackage;
