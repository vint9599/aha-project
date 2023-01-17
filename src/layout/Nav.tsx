import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavIcon from "../assets/NavIcon";

interface Page {
  label: string;
  path: string;
  children?: string[];
  displayDot: boolean;
}

const pages: Page[] = [
  {
    label: "Home",
    path: "/search",
    children: ["/search/result"],
    displayDot: false,
  },
  { label: "Tags", path: "/tags", displayDot: true },
];

const Nav = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const navLinks = pages.map((page, index) => {
    const pathChildren = page.children ?? [];
    const isMatchSubPage = pathChildren.some((subPath) =>
      subPath.startsWith(pathName)
    );
    let isActive = pathName === page.path || isMatchSubPage;

    return (
      <React.Fragment key={index}>
        <Link to={page.path}>
          <div className="mt-6 mb-[1px] flex flex-col items-center text-[12px]">
            {isActive ? (
              <NavIcon fill="#FFF" />
            ) : (
              <div className="relative">
                {page.displayDot ? (
                  <div className="absolute -right-[7px] -top-[7px] h-[9px] w-[9px] rounded-full border border-appDarkGrey bg-appSkyBlue" />
                ) : null}

                <NavIcon fill="#8A8A8F" />
              </div>
            )}
          </div>
          <div className="mt-[1px] -mb-[2px] h-[20px] text-center text-[12px] tracking-[0.3px]">
            {isActive ? page.label : ""}
          </div>
        </Link>
      </React.Fragment>
    );
  });

  return (
    <div className="h-screen min-w-[80px] max-w-[80px] bg-appDarkGrey p-4 text-white">
      <Link to="/search">
        <div className="mt-[11px] cursor-pointer bg-gradient-to-r from-appOrange to-appYellow bg-clip-text px-1 py-2 text-center text-[13px] font-bold -tracking-[0.5px] text-transparent">
          LOGO
        </div>
      </Link>

      <div className="ml-[1px] mt-[34px] pb-1">{navLinks}</div>
    </div>
  );
};

export default Nav;
