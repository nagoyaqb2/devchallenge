"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode, useState } from "react";
import { QueryClient } from "@tanstack/react-query";

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
