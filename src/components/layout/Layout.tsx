import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutPropsType {
  children: ReactNode;
}

export function Layout({ children }: LayoutPropsType) {
  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--background))]">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
