import React from "react";
import Input from "../components/Input";
import PageNumberSlider from "../components/PageSlider";
import { Link } from "react-router-dom";

const Home = () => {
  const [keyword, setKeyword] = React.useState<string>("");
  const [pageSize, setPageSize] = React.useState<string>("3");
  console.log("keyword", keyword);
  return (
    <>
      <div className="px-16 ml-[2px] mt-2">
        <h1 className="text-[1.5rem] mb-4 ml-[1px] my-1">Search</h1>
        <div className="mb-[28px] max-w-[725px] pt-[3px]">
          <Input
            placeholder="Keyword"
            value={keyword}
            onChange={(event) => {
              console.log(event);
              setKeyword(event.target.value);
            }}
          />
        </div>
        <hr className="border-white border-1 border-opacity-10 mx-0.5" />

        <h2 className="text-[1.5rem] mt-[31px]"># Of Results Per Page</h2>
        <div className="mt-[15px] flex items-end h-[50px] max-h-[50px]">
          <div className="text-[46.25px] -mb-[14px] font-bold tracking-[1.8px]">
            30
          </div>
          <div className="text-[1rem] ml-[10px]">results</div>
        </div>

        <div className="mt-[12px] mb-12">
          <PageNumberSlider />
        </div>

        <div className="w-full mt-[389px] mb-6">
          <Link to={`/results?page=1&pageSize=${pageSize}&keyword=${keyword}`}>
            <button className="contained-btn w-full max-w-[343px] px-[13px] py-[7px] text-[14px] font-bold">
              SEARCH
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
