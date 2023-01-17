import React from "react";

const Input: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = ({ ...props }) => (
  <div>
    <input
      {...props}
      className="h-[60px] w-full rounded-md border-[3px] border-white border-opacity-50 bg-appBlack pl-[15px] text-[14px] tracking-[.25px] outline-none transition-all placeholder:text-white placeholder:text-opacity-30 focus:border-appBrightOrange"
    />
  </div>
);

export default Input;
