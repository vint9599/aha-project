import React from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import PageSizeSlider from "../components/PageSlider";

const Home = () => {
  const [pageSize, setPageSize] = React.useState<string>("3");
  const [keyword, setKeyword] = React.useState<string>("");

  return (
    <>
      <div className="ml-[2px] mt-2 px-16">
        <h1 className="my-1 mb-4 ml-[1px] text-[1.5rem]">Search</h1>
        <div className="mb-[28px] max-w-[725px] pt-[3px]">
          <Input
            placeholder="Keyword"
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
            }}
          />
        </div>
        <hr className="border-1 mx-0.5 border-white border-opacity-10" />

        <h2 className="mt-[31px] text-[1.5rem]"># Of Results Per Page</h2>
        <div className="mt-[15px] flex h-[50px] max-h-[50px] items-end">
          <div className="-mb-[14px] text-[46.25px] font-bold tracking-[1.8px]">
            30
          </div>
          <div className="ml-[10px] text-[1rem]">results</div>
        </div>

        <div className="mt-[12px] mb-12">
          <PageSizeSlider value={pageSize} setValue={setPageSize} />
        </div>

        <div className="mt-[389px] w-full">
          <Link
            to={`/search/result?page=1&pageSize=${pageSize}&keyword=${keyword}`}
          >
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
