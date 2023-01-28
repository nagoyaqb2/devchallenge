import "./globals.css";
import { Providers } from "./providers";

import Glysa from "@next/font/local";
import Lexend_Deca from "@next/font/local";

export const glysa = Glysa({
  src: "../public/fonts/Glysa.otf",
  preload: true,
  display: "swap",
});
export const lexend = Lexend_Deca({
  src: "../public/fonts/LexendDeca-VariableFont_wght.ttf",
  preload: true,
  display: "swap",
});

export default function RootLayout({
  children,
}: React.PropsWithChildren<unknown>) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <main className="min-h-screen w-full p-4 bg-[#141414] text-white">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
