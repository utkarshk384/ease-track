import React, { useEffect, useMemo, useState } from "react";
import Dropdown from "react-dropdown";

/* Components */
import { ChevronIcon, SearchIcon } from "components/icons";
import { trpc } from "src/utils/trpc";
import { useKeyPress } from "src/hooks";

/* Consts */
import { DELIVERY_PARTNERS } from "src/consts";

type Props = {
  children?: React.ReactNode;
  userId: string;
};

export const SearchBar: React.FC<Props> = (props) => {
  const { userId } = props;

  /* Querys */
  const addPackage = trpc.packages.add.useMutation();
  const { refetch } = trpc.packages.getAll.useQuery({ userId });

  /* Hooks */
  const isEnterPressed = useKeyPress("Enter");

  /* Memos */
  const deliveryPartners = useMemo(() => DELIVERY_PARTNERS, []);

  /* States */
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isOptsOpen, setIsOptsOpen] = useState(false);
  const [partner, setPartner] = useState(deliveryPartners[0]);

  /* Effects */

  useEffect(() => {
    if (isEnterPressed) AddPackage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnterPressed]);

  /* Handlers */
  const AddPackage = () => {
    if (search === "") {
      setError("Please enter a tracking ID");
      return;
    }
    setError("");

    if (addPackage.isLoading) return;
    addPackage
      .mutateAsync({
        userId,
        trackingId: search,
        deliveryPartner: partner?.value || "DETECT",
      })
      .then(() => {
        setSearch("");
        refetch();
      })
      .catch((err) => {
        setError("An error occurred.");
        console.warn(err);
      });
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2 text-secondary">
        <div className="relative">
          <input
            type="text"
            className="h-10 w-full rounded-xl bg-primary pl-6 pr-12 focus:outline-none"
            onChange={(e) => setSearch(e.currentTarget.value)}
            value={search}
            placeholder="Enter your tracking ID here"
          />
          <button
            className="absolute right-0 top-1/2 mr-6 -translate-y-1/2"
            onClick={() => AddPackage()}
          >
            <SearchIcon className="text-current" />
          </button>
        </div>
        <p className="mt-1 text-paragraph text-red-300">{error}</p>
      </div>
      <div className="flex flex-col gap-1">
        <button
          className="flex items-center gap-2 text-paragraph font-bold text-primary"
          onClick={() => setIsOptsOpen(!isOptsOpen)}
        >
          <p>Advanced Options</p>
          <ChevronIcon
            strokeWidth={4}
            height={18}
            className={`duration-250 transition-transform ${
              isOptsOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
        {isOptsOpen && (
          <div className="flex min-h-[15rem] gap-4 rounded-xl bg-primary p-4">
            <fieldset className="ml-0 flex flex-col gap-2">
              <label className="ml-2 text-paragraph text-secondary">
                Delivery Partner
              </label>
              <Dropdown
                menuClassName="absolute bg-amber-300 mt-2 rounded-xl cursor-pointer py-2 px-4 gap-2 flex flex-col left-0 w-40"
                className="relative w-40 rounded-xl bg-accent px-4 text-secondary"
                options={deliveryPartners}
                onChange={({ label: l, value }) =>
                  setPartner({ label: l as string, value })
                }
                value={partner}
              />
            </fieldset>
          </div>
        )}
      </div>
    </div>
  );
};
