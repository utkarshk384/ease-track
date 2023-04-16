import { format } from "date-fns";

/* Types */
import type { FormatDateInterface } from "src/types/date";

export const FormatDate: FormatDateInterface = (date, dateFormat) => {
  return format(date, dateFormat);
};

export { parseISO as ParseISO } from "date-fns";
