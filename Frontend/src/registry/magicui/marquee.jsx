import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Marquee = ({
  children,
  className,
  pauseOnHover = false,
  reverse = false,
  ...props
}) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className={cn(
        "flex w-full overflow-hidden [--duration:40s] [--gap:1rem]",
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      {...props}>
      <div
        className={cn(
          "flex w-max items-stretch gap-[--gap]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          isPaused && "animation-pause"
        )}>
        {children}
      </div>
      <div
        className={cn(
          "flex w-max items-stretch gap-[--gap]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          isPaused && "animation-pause"
        )}>
        {children}
      </div>
    </div>
  );
};
