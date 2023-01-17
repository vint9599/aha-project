import React from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import leftArrow from "../assets/leftArrow.svg";
import api from "../api";
import { ApiPaginationResult } from "../api/type";
import { User } from "../types/user";
import { searchUsers } from "../feed/userSearchFeed";
import { Skeleton } from "@mui/material";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const prevSearchData = location.state ?? [];

  const queryPage = searchParams.get("page") ?? "1";
  const queryPageSize = searchParams.get("pageSize") ?? "3";
  const queryPageKeyword = searchParams.get("keyword") ?? "";

  const prevSearch = React.useRef<User[]>([]);
  const [searchResult, setSearchResult] = React.useState<User[]>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(true);
  const [isInfiniteFetching, setIsInfiniteFetching] =
    React.useState<boolean>(false);
  const isFirstFetching = prevSearch.current.length === 0;
  const isFetchingMore = !isFirstFetching && isFetching;

  let lastUser = React.useRef();
  const { isVisible: isVisibleLastTag, handleObserveRef } = useInfiniteScroll(
    lastUser,
    isFetchingMore
  );
  const setNextPage = () => {
    setSearchParams((prev) => {
      const newPage = Number(prev.get("page")) + 1;
      return {
        page: newPage.toString(),
      };
    });
  };

  const handleAppendData = () => {
    setSearchResult((prev) => {
      const newData = [...prev.slice(0, 3)];
      console.log("newData", newData);
      return [...prev, ...newData];
    });
  };

  const fetchMore = async (): Promise<void> => {
    const response = await api.get<ApiPaginationResult<User[]>>(
      `/users/all?page=${queryPage}&pageSize=${queryPageSize}&keyword=${queryPageKeyword}`
    );

    const userData = response?.data?.data;

    if (Array.isArray(userData) && userData.length > 0) {
      setSearchResult(() => {
        const allUser = [...prevSearchData, ...userData];

        prevSearch.current = allUser;
        return allUser;
      });
    } else {
      handleAppendData();
    }
    setIsFetching(false);
  };

  const fetchInfiniteData = async (): Promise<void> => {
    setIsInfiniteFetching(true);
    const response = await api.get<ApiPaginationResult<User[]>>(
      `/users/all?page=${queryPage}&pageSize=${queryPageSize}&keyword=${queryPageKeyword}`
    );

    const userData = response?.data?.data;

    if (Array.isArray(userData) && userData.length > 0) {
      setSearchResult((prev) => {
        const allUser = [...prev, ...userData];
        prevSearch.current = allUser;

        return allUser;
      });
    } else {
      handleAppendData();
    }

    setIsInfiniteFetching(false);
  };

  React.useEffect(() => {
    if (isFetching) {
      fetchMore();
    }
  }, [isFetching]);

  React.useEffect(() => {
    if (isVisibleLastTag) {
      setNextPage();
      fetchInfiniteData();
    }
  }, [isVisibleLastTag]);

  const skeleton = React.useMemo(() => {
    return Array.from<number>({ length: Number(queryPageSize) }).map(
      (item, index) => {
        return (
          <div key={`skeleton_${index}`} className="flex flex-col">
            <Skeleton
              variant="rounded"
              sx={{
                width: "219px",
                height: "146px",
                bgcolor: "grey.900",
              }}
            />
            <Skeleton
              variant="text"
              sx={{
                width: "160px",
                bgcolor: "grey.900",
                fontSize: "14.9px",
                marginTop: "10px",
              }}
            />

            <Skeleton
              variant="text"
              sx={{
                width: "160px",
                bgcolor: "grey.900",
                fontSize: "11.17px",
                marginTop: "8px",
              }}
            />
          </div>
        );
      }
    );
  }, []);

  const searchUser = searchResult.map((user, index) => {
    let userRef = null;
    if (searchResult.length === index + 1) {
      userRef = handleObserveRef;
    }

    return (
      <div key={index} ref={userRef} className="flex flex-col">
        <img
          src={searchUsers[index].avetar}
          alt={`${user.username}`}
          width="219px"
          height="146px"
        />
        <p className="mt-[10px] text-[14.9px] tracking-[0.14px]">
          This is a title
        </p>
        <p className="mt-[8px] text-[11.17px] tracking-[0.37px] text-appGrey">
          {`by ${user.username}`}
        </p>
      </div>
    );
  });

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="">
          <h1 className="ml-[32px] flex h-fit items-center text-[30px] tracking-[0.25px]">
            <Link to={`/search`}>
              <img
                src={leftArrow}
                alt="left_arrow"
                width="12.77px"
                height="21.67px"
              />
            </Link>

            <p className="ml-[32px]">Results</p>
          </h1>

          <div className="ml-[20px] mt-[30px] mb-[40px] grid max-h-[610px] grid-cols-3 overflow-y-scroll px-[40px]">
            {isFirstFetching ? skeleton : searchUser}
            {isFetchingMore || isInfiniteFetching ? skeleton : null}
          </div>
        </div>

        <div>
          <Link
            to={`/search/result?page=${
              Number(queryPage) + 1
            }&pageSize=${queryPageSize}&keyword=${queryPageKeyword}`}
            state={searchResult}
            onClick={() => {
              setNextPage();
              setIsFetching(true);
            }}
          >
            <button className="contained-btn w-full max-w-[343px] px-[13px] py-[7px] text-[14px] font-bold">
              MORE
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Search;
