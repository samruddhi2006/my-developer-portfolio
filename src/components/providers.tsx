"use client";

import SocketContextProvider from "@/contexts/socketio";
import MotionPreferences from "./motion-preferences";
import Preloader from "./preloader";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/toaster";
import { TooltipProvider } from "./ui/tooltip";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <MotionPreferences>
        <Preloader>
          <SocketContextProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster />
          </SocketContextProvider>
        </Preloader>
      </MotionPreferences>
    </ThemeProvider>
  );
};
