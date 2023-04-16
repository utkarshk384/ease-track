import React from "react";

type Props = {
  children: React.ReactNode;
};

export const BackgroundLayout: React.FC<Props> = (props) => {
  return (
    <div className="flex h-full flex-col bg-gradient-to-t from-[#103783] to-[#2565E4] text-white">
      {props.children}
    </div>
  );
};
