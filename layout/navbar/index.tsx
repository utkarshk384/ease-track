import { Logo } from "components/logo";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useScroll } from "src/hooks";

type Props = {
  children?: React.ReactNode;
};

type scrollClassesType =
  | "bg-secondary shadow-lg"
  | "bg-transparent shadow-none"
  | "";

export const Navbar: React.FC<Props> = (props) => {
  const {} = props;

  /* router */
  const router = useRouter();

  const { scrollY } = useScroll();

  const [scrollClasses, setScrollClasses] = useState<scrollClassesType>("");

  useEffect(() => {
    if (scrollY < 10) setScrollClasses("bg-secondary shadow-lg");
    else setScrollClasses("bg-transparent shadow-none");
  }, [scrollY]);

  return (
    <div className={`sticky top-0 z-[9999999] ${scrollClasses} py-2`}>
      <div className="mx-auto flex w-11/12 items-center justify-between">
        <Logo width={96} height={96} />
        <div className="flex gap-10 text-primary">
          <button
            onClick={() => router.push("/#track", "/#track", { shallow: true })}
            className="w-fit text-paragraph"
          >
            Track
          </button>
          <button
            onClick={() =>
              router.push("/#packages", "/#packages", { shallow: true })
            }
            className="w-fit text-paragraph"
          >
            Pacakges
          </button>
          <button
            onClick={() =>
              router.push("/#supported-partners", "/#supported-partners", {
                shallow: true,
              })
            }
            className="w-max text-paragraph"
          >
            Supported Partners
          </button>
        </div>
      </div>
    </div>
  );
};
