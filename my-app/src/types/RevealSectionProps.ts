import { ReactNode } from "react";

export type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  lazy?: boolean;
  slideFrom?: "left" | "right" | "bottom";
};