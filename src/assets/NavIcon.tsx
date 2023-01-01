import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = ({ fill = "#fff", ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.341 0a1.5 1.5 0 0 0 0 3h10.417v9.423a1.5 1.5 0 0 0 3 0V2.5a2.5 2.5 0 0 0-2.5-2.5H6.34ZM2 4.915h11.122a2 2 0 0 1 2 2v11.122a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6.915a2 2 0 0 1 2-2Z"
      fill={fill}
    />
  </svg>
);

export default SvgComponent;
