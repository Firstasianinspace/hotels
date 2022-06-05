import { useLayoutFactory } from "@/helpers/useLayoutFactory";

export const LAYOUTS = {
  grid: Symbol("grid"),
  list: Symbol("list"),
};

const { useLayout: useHotelsLayout } = useLayoutFactory(LAYOUTS, LAYOUTS.grid);

export { useHotelsLayout };
