import "./globals.css";
import { Providers } from "./providers";

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
