type SVGProps = React.SVGProps<SVGSVGElement>;

type IconProps = {
  className?: string;
};

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`h-6 w-6 ${className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

export const CopyToClipboard: React.FC<IconProps & SVGProps> = (props) => (
  <svg
    width={18}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 3.952H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1m-10-13a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m-6 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m0 0h2a2 2 0 0 1 2 2v3m2 4H7m0 0 3-3m-3 3 3 3"
      stroke="#103783"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronIcon: React.FC<IconProps & SVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    height={24}
    width={24}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

export const TrashIcon: React.FC<IconProps & SVGProps> = (props) => (
  <svg
    width={18}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    stroke={props.stroke || "#EF4444"}
  >
    <path
      d="m16 5-.867 12.142A2 2 0 0 1 13.138 19H4.862a2 2 0 0 1-1.995-1.858L2 5m5 4v6m4-6v6m1-10V2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3M1 5h16"
      stroke="inherit"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
