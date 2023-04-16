import React from "react";
import Image from "next/image";

type Props = {
  children?: React.ReactNode;
  deliveryPartner: string;
  date: string;
  time: string;
  status: string;
  place: string;
};

export const TrackedItem: React.FC<Props> = (props) => {
  const { date, deliveryPartner, time, place, status } = props;

  return (
    <div className="flex gap-10 text-secondary">
      <div className="relative flex w-1/3 items-center gap-2">
        <Image
          className="overflow-hidden rounded-lg"
          width={40}
          height={35}
          src={`/logos/${deliveryPartner}.png`}
          alt="Logos"
        />
        <div className="flex flex-col gap-1">
          <p className="text-paragraph font-bold">{date}</p>
          <p className="text-paragraph">{time}</p>
        </div>
        <div className="absolute -right-[0.9rem] top-1/2 h-7 w-7 -translate-y-1/2 rounded-full  border-2 border-secondary bg-accent" />
      </div>
      <div className="flex w-2/3 flex-col">
        <p className="text-paragraph font-bold">{status}</p>
        <p className="text-paragraph">{place}</p>
      </div>
    </div>
  );
};
