import { parse } from "date-fns";
import type { TransformerDataType } from "server/types";

export const EKartTransformer = (details: any): TransformerDataType[] => {
  const data: TransformerDataType[] = [];

  if (!details) return data;
  details.shipmentTrackingDetails.map((item: any) => {
    data.push({
      status: item.statusDetails,
      date: new Date(item.date).toISOString(),
      place: item.city,
    });
  });

  return data.reverse();
};

export const DTDCTransformer = (details: any): TransformerDataType[] => {
  const data: TransformerDataType[] = [];

  if (details[0].activityType === "Invalid Data") return data;

  details.map((item: any) => {
    const date = parse(
      sanitizeDate(`${item.dateWithNoSuffix} ${item.time}`),
      "dd/MM/yyyy HH:mm",
      new Date()
    );
    data.push({
      status: item.activityType,
      date: date.toISOString(),
      place: item.dest || item.origin,
    });
  });

  return data;
};

const sanitizeDate = (date: string): string => {
  date = date.trim();
  date = date.split("-").join("/"); // Replace all occurances of - with /
  return date;
};
