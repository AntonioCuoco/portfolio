import CustomCursor from "@/Components/CustomCursor/CustomCursor";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <CustomCursor />
      {children}
    </>
  );
}
