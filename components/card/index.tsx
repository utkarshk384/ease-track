import React from "react";
import Image from "next/image";

/* Types */
import type { DeliveryPartnersType } from "src/consts";

type Props = {
  children?: React.ReactNode;
  deliveryPartner: DeliveryPartnersType;
  name: string;
  description: string[];
};

export const Card: React.FC<Props> = (props) => {
  const { deliveryPartner, name, description } = props;

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-primary p-6 text-secondary">
      <div className="flex gap-3">
        <Image
          className="overflow-hidden rounded-lg"
          width={40}
          height={42}
          src={`/logos/${deliveryPartner}.png`}
          alt="Logos"
        />
        <h2 className="text-sub-heading font-bold">{name}</h2>
      </div>
      <div className="flex flex-col gap-2">
        {description.map((itm, i) => (
          <p key={`${i}-description`} className="text-paragraph">
            {itm}
          </p>
        ))}
      </div>
    </div>
  );
};
