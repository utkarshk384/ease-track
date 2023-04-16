export const DELIVERY_PARTNERS = [
  {
    label: "Detect",
    value: "DETECT",
  },
  {
    label: "Ekart Logisitics",
    value: "EKART",
  },
  // {
  //   label: "Delhivery",
  //   value: "DELHIVERY",
  // },
  {
    label: "DTDC",
    value: "DTDC",
  },
];

export type DeliveryPartnersType = "EKART" | "DTDC";

type CardsType = {
  deliveryPartner: DeliveryPartnersType;
  name: string;
  description: string[];
};

export const DELIVERY_PARTNER_DESC: CardsType[] = [
  {
    deliveryPartner: "EKART",
    name: "Ekart Logistics",
    description: [
      "Ekart Logistics is one of the many private delivery service companies that can be found in India. Due to the sheer size of India, it is no wonder companies like Ekart Logistics excel in their services and the capacity of their operations.",

      "Ekart uses a 10 alphanumeric digits as their tracking number.",
    ],
  },
  // {
  //   deliveryPartner: "delhivery",
  //   name: "Delhivery",
  //   description: [
  //     "Delhivery is an Indian logistics company and one of the largest and most popular in operation. They handle logistics for 7,500+ e-commerce businesses across India. Delhivery provides COD services as well as reverse and exchange logistics.",

  //     "Delhivery uses 12 to 14 numerical digits as their tracking number.",
  //   ],
  // },
  {
    deliveryPartner: "DTDC",
    name: "DTDC",
    description: [
      "DTDC is among the top logistics startups in India, founded in Bangalore in 1990. It currently caters to 10,000+ customers across 17,500+ pin codes, and 75% of its customer base is made up of major eCommerce businesses.",

      "DTDC uses 10 alphanumeric digits as their tracking number.",
    ],
  },
];

export const URLS: Record<string, string> = {
  EKART: "https://ekartlogistics.com/ws/getTrackingDetails",
  DTDC: "https://tracking.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=getLoadMovementDetails&cnNo=<id>",
  DELHIVERY: "https://dlv-api.delhivery.com/v3/unified-tracking?wbn=<id>",
};
