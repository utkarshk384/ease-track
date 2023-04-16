import React from "react";

type Props = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLAnchorElement>;

export const Button: React.FC<Props> = (props) => {
  const { className, ...rest } = props;

  return (
    <a
      className={`flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-accent py-2.5 px-5 text-paragraph font-bold ${className}`}
      {...rest}
    >
      {props.children}
    </a>
  );
};
