import React from "react";

import { tags } from "../feed/tagFeed";
import { Skeleton } from "@mui/material";
import { getTags } from "../api/tags";
import { Tag } from "../types/tag";
import useApi from "../hooks/useApi";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const Tags = () => {
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [isInfiniteFetching, setIsInfiniteFetching] =
    React.useState<boolean>(false);

  let lastTag = React.useRef();
  const { isVisible: isVisibleLastTag, handleObserveRef } = useInfiniteScroll(
    lastTag,
    isInfiniteFetching
  );

  const { result: firstTagData, isFetching: isFirstFetching } = useApi(getTags);

  React.useEffect(() => {
    if (
      !isFirstFetching &&
      Array.isArray(firstTagData) &&
      firstTagData.length > 0
    ) {
      setTags(firstTagData);
    }
  }, [isFirstFetching, firstTagData]);

  React.useEffect(() => {
    const handleInfiniteScroll = () => {
      setIsInfiniteFetching(true);
      if (Array.isArray(firstTagData) && firstTagData.length > 0) {
        setTimeout(() => {
          setTags((prev) => {
            return prev.concat(...firstTagData);
          });
          setIsInfiniteFetching(false);
        }, 500);
      }
    };

    if (isVisibleLastTag) {
      handleInfiniteScroll();
    }
  }, [isVisibleLastTag]);

  let tagList = null;
  if (Array.isArray(tags) && tags.length > 0) {
    tagList = tags.map((tag, index) => {
      // handle last tag ref for infinite scroll
      let tagRef = null;
      if (tags.length === index + 1) {
        tagRef = handleObserveRef;
      }

      return (
        <React.Fragment key={index}>
          <div
            ref={tagRef}
            className="mx-2 mb-[35px] flex w-[150px] flex-col overflow-x-hidden"
          >
            <div className="mb-[11px] ml-[2px] flex h-[150px] w-[150px] items-end rounded-[10px] bg-white bg-opacity-[0.06]">
              <div className="w-full pl-[14px] pr-[8px] pb-[18px]">
                <div className="h-fit w-fit max-w-full overflow-x-hidden text-ellipsis whitespace-nowrap rounded-[6.7px] pb-[2px] pl-[10px] pr-[12px] pt-[4px] text-center text-[24px] font-bold text-white outline outline-4 outline-white">
                  {tag.name}
                </div>
              </div>
            </div>
            <div className="ml-[2px] w-full">
              <p className="text-[14.9px] tracking-[0.14px]">{tag.name}</p>
              <p className="text-[11.17px] tracking-[0.37px]">{`${tag.count} Results`}</p>
            </div>
          </div>
        </React.Fragment>
      );
    });
  }

  const skeleton = Array.from<number>({ length: 20 }).map((item, index) => {
    return (
      <div
        key={`skeleton_${index}`}
        className="mx-2 mb-[35px] flex w-[150px] flex-col"
      >
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
        <div className="mt-[1px] mb-[23px] ml-[2px] text-[30px] tracking-[0.25px] text-white">
          Tags
        </div>
        <div className="flex max-w-[848px] flex-wrap justify-start">
          {!isFirstFetching ? tagList : skeleton}
          {isInfiniteFetching ? skeleton : null}
        </div>
      </div>
    </>
  );
};

export default Tags;
