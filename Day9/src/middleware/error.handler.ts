import type { NextFunction, Request, Response } from "express";
import { Prisma } from "../generated/client";
import { errorResponse } from "../utils/response";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("ERROR:", err.message);

  const statusCode = err.message.includes("tidak ditemukan") ? 404 : 400;

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      errorResponse(
        res,
        `Data sudah ada (Unique Constraint violation) \n ${err.message}`,
        statusCode,
        process.env.NODE_ENV === "development"
          ? ({ stack: err.stack } as { stack?: string })
          : null
      );
    }

    if (err.code === "P2025") {
      errorResponse(
        res,
        `Data tidak ditemukan \n${err.message}`,
        statusCode,
        process.env.NODE_ENV === "development"
          ? ({ stack: err.stack } as { stack?: string })
          : null
      );
    }
  }

  errorResponse(
    res,
    err.message || "Terjadi kesalahan server",
    statusCode,
    process.env.NODE_ENV === "development"
      ? ({ stack: err.stack } as { stack?: string })
      : null
  );
};
