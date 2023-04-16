import axios from "axios";

export type ResponseType<T = any> = {
  status: string;
  data: T;
};

export type RequestType<T> = {
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  url?: string;
  headers?: Record<string, string>;
  body?: T;
  defaultHeaders?: boolean;
  skipCors?: boolean;
};

export const AxiosWrapper = async <T, K = Record<string, string>>(
  req: RequestType<K>
): Promise<ResponseType<T>> => {
  const { body, defaultHeaders, headers, method, skipCors, url } = req;

  return new Promise<ResponseType<T>>((resolve, reject) => {
    let finalHeaders = headers;

    if (defaultHeaders)
      finalHeaders = {
        ...headers,
        "Content-Type": "application/json",
        Accept: "application/json",
      };

    axios({
      method: method.toLowerCase(),
      url: skipCors ? `${process.env.PROXY_SERVER_URL}${url}` : url,
      headers: finalHeaders,

      data: body,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
