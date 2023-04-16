import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

/* Lottie Animations */
import loadingTruck from "src/assets/lottie/empty.json";

type Props = {
  children?: React.ReactNode;
  text?: string;
  wrapperClassName?: string;
  className?: string;
};

export const EmptyAnimation: React.FC<Props> = (props) => {
  const { text = "Nothing was found", wrapperClassName, className } = props;
  return (
    <div
      className={`mx-auto flex w-fit flex-col items-center justify-center gap-0 ${
        wrapperClassName || ""
      }`}
    >
      <Player
        loop
        autoplay
        className={`h-32 w-32 ${className || ""}`}
        src={loadingTruck}
      />
      <p className="text-sub-heading font-bold">{text}</p>
    </div>
  );
};
