import React from "react";
import { useTag } from "../api/tags";
import { tags } from "../feed/tagFeed";
import { Skeleton } from "@mui/material";

const Tags = () => {
  // const { data: tagData, isLoading: isFetchingTag } = useTag();

  // console.log("tagData", tagData);
  let tagList = null;
  // if (!isFetchingTag && Array.isArray(tagData) && tagData.length > 0) {
  tagList = tags.map((tag, index) => {
    // console.log("tag", tag);
    return (
      <React.Fragment key={index}>
        <div className="flex flex-col mb-[35px]">
          <div className="h-[150px] w-[150px] flex bg-white bg-opacity-[0.06] rounded-[10px] items-end mb-[11px] ml-[2px]">
            <div className="pl-[14px] pr-[8px] pb-[18px] w-full">
              <div className="w-fit max-w-full text-white text-[24px] font-bold whitespace-nowrap text-ellipsis overflow-x-hidden text-center pb-[2px] outline outline-4 outline-white h-fit rounded-[6.7px] pl-[10px] pr-[12px] pt-[4px]">
                {tag.name}
              </div>
            </div>
          </div>
          <div className="ml-[2px]">
            <p className="text-[14.9px] tracking-[0.14px]">{tag.subName}</p>
            <p className="text-[11.17px] tracking-[0.37px]">{`${tag.results} Results`}</p>
          </div>
        </div>
      </React.Fragment>
    );
  });

  const skeleton = Array.from<number>({ length: 20 }).map((item, index) => {
    return (
      <div key={`skeleton_${index}`} className="flex flex-col mb-[35px]">
        <Skeleton
          variant="rounded"
          sx={{
            width: "150px",
            height: "150px",
            bgcolor: "grey.900",
            marginBottom: "11px",
          }}
        />
        <Skeleton
          variant="text"
          sx={{
            width: "100px",
            bgcolor: "grey.900",
            fontSize: "14.9px",
          }}
        />

        <Skeleton
          variant="text"
          sx={{
            width: "120px",
            bgcolor: "grey.900",
            fontSize: "11.17px",
          }}
        />
      </div>
    );
  });

  return (
    <>
      <div className="pl-[191px] pr-20 pt-8">
        <div className="text-[30px] tracking-[0.25px] mt-[1px] mb-[23px] ml-[2px] text-white">
          Tags
        </div>
        <div className="flex flex-wrap justify-between max-w-[848px]">
          {true ? tagList : skeleton}
        </div>
      </div>
    </>
  );
};

export default Tags;
