import React from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import LeftArrow from "../assets/leftArrow.svg";
import api from "../api";
import { ApiPaginationResult } from "../api/type";
import { User } from "../types/user";
import { searchUsers } from "../feed/userSearchFeed";
import { Skeleton } from "@mui/material";

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

  const fetchMore = async (): Promise<void> => {
    await api
      .get<ApiPaginationResult<User[]>>(
        `/users/all?page=${queryPage}&pageSize=${queryPageSize}&keyword=${queryPageKeyword}`
      )
      .then((res) => {
        let userData = res.data.data;
        if (Array.isArray(userData) && userData.length > 0) {
          setSearchResult(() => {
            const allUser = [...prevSearchData, ...userData];

            prevSearch.current = allUser;
            return allUser;
          });
        }
        setIsFetching(false);
      });
  };

  React.useEffect(() => {
    if (isFetching) {
      fetchMore();
    }
  }, [isFetching]);

  const skeleton = React.useMemo(() => {
    return Array.from<number>({ length: 9 }).map((item, index) => {
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
    });
  }, []);

  const searchUserHtml = searchResult.map((user, index) => {
    return (
      <div key={index} className="flex flex-col">
        <img
          src={searchUsers[index].avetar}
          alt={`${user.username}`}
          width="219px"
          height="146px"
        />
        <p className="text-[14.9px] tracking-[0.14px] mt-[10px]">
          This is a title
        </p>
        <p className="text-[11.17px] text-appGrey tracking-[0.37px] mt-[8px]">
          {`by ${user.username}`}
        </p>
      </div>
    );
  });

  return (
    <>
      <div className="h-full flex justify-between flex-col">
        <div className="">
          <h1 className="h-fit ml-[32px] text-[30px] tracking-[0.25px] items-center flex">
            <Link to={`/search`}>
              <img
                src={LeftArrow}
                alt="left_arrow"
                width="12.77px"
                height="21.67px"
              />
            </Link>

            <p className="ml-[32px]">Results</p>
          </h1>

          <div className="grid grid-cols-3 px-[40px] ml-[20px] mt-[30px] mb-[40px]">
            {isFetching ? skeleton : searchUserHtml}
          </div>
        </div>

        <div>
          <Link
            to={`/search/result?page=${
              Number(queryPage) + 1
            }&pageSize=${queryPageSize}&keyword=${queryPageKeyword}`}
            state={searchResult}
            onClick={() => {
              setSearchParams((prev) => {
                const newPage = Number(prev.get("page")) + 1;
                return {
                  page: newPage.toString(),
                };
              });
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
