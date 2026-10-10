import { createContext } from "react";

export const CustomUiTitleContext = createContext<{
  titles: { [key: string]: string | undefined };
}>({
  titles: {},
});
