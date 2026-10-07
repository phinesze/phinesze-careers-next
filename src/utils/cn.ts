import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwindのクラスを条件付きで連結し、競合するクラスを後勝ちでマージする
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
