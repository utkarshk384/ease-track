import { Prisma } from "@prisma/client";

enum CUSTOM_ERROR_CODES {
  rustPanic = "RUST_PANIC_ERROR",
  unknownRequest = "UNKNOWN_REQUEST_ERROR",
  unknownError = "UNKNOWN_ERROR",
}

export const InferError = (e: unknown) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError)
    return {
      message: handleKnownRequestError(e),
      code: e.code,
      meta: e.meta,
    };

  if (e instanceof Prisma.PrismaClientRustPanicError)
    return {
      stack: e.stack,
      message: `${e.message}. Cause: ${e.cause}`,
      code: CUSTOM_ERROR_CODES.rustPanic,
      meta: null,
    };

  if (e instanceof Prisma.PrismaClientUnknownRequestError)
    return {
      stack: e.stack,
      message: `${e.message}. Cause: ${e.cause}`,
      code: CUSTOM_ERROR_CODES.unknownRequest,
      meta: null,
    };

  if (e instanceof Error)
    return {
      message: "U",
    };

  return {
    message: "Unknown error",
    errror: e,
    code: CUSTOM_ERROR_CODES.unknownError,
    meta: null,
  };
};

const handleKnownRequestError = (e: Prisma.PrismaClientKnownRequestError) => {
  switch (e.code) {
    case "P2002":
      return "Package already exists";
    case "P1001":
    case "P1002":

    default:
      return e.message;
  }
};

export class CustomError extends Error {
  public code: string;
  public meta?: Record<string, unknown>;
  constructor(
    message: string,
    public Code: string,
    Meta?: Record<string, unknown>
  ) {
    super(message);
    this.code = Code;
    this.meta = Meta;
  }
}
