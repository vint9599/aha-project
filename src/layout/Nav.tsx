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
          <div className="flex flex-col items-center text-[12px] mt-6 mb-[1px]">
            {isActive ? (
              <NavIcon fill="#FFF" />
            ) : (
              <div className="relative">
                {page.displayDot ? (
                  <div className="absolute -right-[7px] -top-[7px] h-[9px] w-[9px] rounded-full bg-appSkyBlue border border-appDarkGrey" />
                ) : null}

                <NavIcon fill="#8A8A8F" />
              </div>
            )}
          </div>
          <div className="mt-[1px] -mb-[2px] tracking-[0.3px] h-[20px] text-[12px] text-center">
            {isActive ? page.label : ""}
          </div>
        </Link>
      </React.Fragment>
    );
  });

  return (
    <div className="min-w-[80px] max-w-[80px] h-screen p-4 text-white bg-appDarkGrey">
      <Link to="/search">
        <div className="px-1 py-2 mt-[11px] text-center text-transparent bg-clip-text bg-gradient-to-r from-appOrange to-appYellow font-bold text-[13px] -tracking-[0.5px] cursor-pointer">
          LOGO
        </div>
      </Link>

      <div className="ml-[1px] mt-[34px] pb-1">{navLinks}</div>
    </div>
  );
};

export default Nav;
