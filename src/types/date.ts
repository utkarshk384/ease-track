export type FormatOpts =
  | "MMM dd yyy hh:mmaaa"
  | "hh:mmaaa"
  | "eeee, MMMM dd, yyy";

export type DateType = number | Date;
export type FormatDateInterface = (
  date: DateType,
  format: FormatOpts
) => string;
