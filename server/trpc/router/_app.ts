import { router } from "../trpc";
import { PacakgesRouter } from "./packages";

export const appRouter = router({
  packages: PacakgesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
