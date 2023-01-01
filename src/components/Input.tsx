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
      className="border-white border-opacity-50 border-[3px] h-[60px] w-full bg-appBlack pl-[15px] rounded-md focus:border-appBrightOrange outline-none transition-all placeholder:text-white placeholder:text-opacity-30 tracking-[.25px] text-[14px]"
    />
  </div>
);

export default Input;
