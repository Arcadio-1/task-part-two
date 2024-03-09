import React, { ReactNode } from "react";
import { cn } from "../../lib/utils";
type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};
export const Container: React.FC<ContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={`grid place-items-center h-dvh m-4`}>
      <div
        {...props}
        className={cn(
          `bg-gray-800 rounded-lg p-3 w-full max-w-3xl flex flex-col gap-5`,
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
