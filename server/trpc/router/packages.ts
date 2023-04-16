import { z } from "zod";

/* Router */
import { router, publicProcedure } from "../trpc";

/* Handlers */
import { getDetail } from "../controllers/package";
import { InferError, CustomError } from "../controllers/error";

/* Utils */
import { DetectCourier, RefetchPackages } from "../utils";

/* Types */
import type { Package } from ".prisma/client";

const addPackageInput = z.object({
  trackingId: z.string(),
  deliveryPartner: z.string(),
  userId: z.string(),
});

const getAllInput = z.object({
  userId: z.string(),
});

const getByIdInput = getAllInput.extend({
  id: z.string(),
});

export const PacakgesRouter = router({
  add: publicProcedure
    .input(addPackageInput)
    .mutation(async ({ input, ctx }) => {
      try {
        const delivery_partner =
          input.deliveryPartner === "DETECT"
            ? DetectCourier(input.trackingId)
            : input.deliveryPartner;

        const body = {
          delivery_partner,
          tracking_id: input.trackingId,
          userId: input.userId,
        };
        
        console.log({ window, document, aL: "test" })

        const details = await getDetail(body as Package);
        const res: Package = await ctx.prisma.package.create({
          data: { ...body, details },
        });

        return {
          package: res,
        };
      } catch (e) {
        return InferError(e);
      }
    }),

  getAll: publicProcedure.input(getAllInput).query(async ({ ctx, input }) => {
    try {
      await RefetchPackages(input.userId, ctx.prisma);
    } catch (e) {}

    const packages = await ctx.prisma.package.findMany();

    return packages;
  }),

  getById: publicProcedure.input(getByIdInput).query(async ({ input, ctx }) => {
    try {
      await RefetchPackages(input.userId, ctx.prisma);
      const res = await ctx.prisma.package.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!res)
        return InferError(
          new CustomError("Package not found", "PACKAGE_NOT_FOUND")
        );

      return res;
    } catch (e) {
      return InferError(e);
    }
  }),

  deleteByTrackingId: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      try {
        const res = await ctx.prisma.package.delete({
          where: {
            tracking_id: input,
          },
        });

        return res;
      } catch (e) {
        return InferError(e);
      }
    }),
});
