type SetCookieInterface = (opts: SetCookieParams) => void;

type SetCookieParams = {
  name: string;
  value: string | number | boolean;
  days?: number;
  path?: string;
};

export const useCookie = () => {
  const setCookie: SetCookieInterface = (opts) => {
    const { name, value, days = 365, path = "/" } = opts;

    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie =
      name +
      "=" +
      encodeURIComponent(value) +
      "; expires=" +
      expires +
      "; path=" +
      path;
  };

  const getCookie = (name: string) => {
    if (typeof window !== "undefined") {
      return document.cookie.split("; ").reduce((r, v) => {
        const parts = v.split("=");
        return parts[0] === name ? decodeURIComponent(parts[1] as string) : r;
      }, "");
    }

    return "";
  };

  const deleteCookie = (name: string, path?: string) => {
    setCookie({
      name,
      value: "",
      days: -1,
      path,
    });
  };

  return { setCookie, getCookie, deleteCookie };
};
