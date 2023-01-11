import React from "react";
import { users } from "../feed/followFeed";
import User8 from "../assets/user8.jpg";
import { useFollower, useFollowing } from "../api/follow";
import { User } from "../types/user";
import { Skeleton } from "@mui/material";

interface FollowStatus {
  [status: string]: boolean;
}
interface Tab {
  [status: string]: number;
}

interface StatusText {
  [statusString: string]: string;
}

const TAB_TYPE: Tab = {
  FOLLOWERS: 0,
  FOLLOWING: 1,
};

const TAP_TYPE_TEXT: StatusText = {
  [TAB_TYPE.FOLLOWERS]: "Followers",
  [TAB_TYPE.FOLLOWING]: "Following",
};

const FOLLOW_STATUS: FollowStatus = {
  FOLLOW: true,
  NOT_FOLLOW: false,
};

const Follower = () => {
  const { data: followerData, isLoading: isFetchingFollower } = useFollower();
  const { data: followingData, isLoading: isFetchingFollowing } =
    useFollowing();

  const [tabIndex, setTabIndex] = React.useState<number>(0);

  const makeFollowHtml = (data: User[]): JSX.Element[] => {
    return data.map((follower, index) => {
      const { id, isFollowing, name, username } = follower;

      let imgSrc = "";
      // avatar image url isn't available, use static file instead
      // console.log("users.length", users.length, index);
      if (users.length > index) {
        imgSrc = users[index]?.pic ?? "";
      } else {
        imgSrc = User8;
      }

      return (
        <React.Fragment key={id}>
          <div className="flex justify-between items-center px-4">
            <div className="w-full inline-flex items-center my-2 mr-[2px]">
              <img
                src={imgSrc}
                alt={`user_${name}`}
                className="w-10 h-10 rounded-[5px] mr-[15px]"
              />
              <div className="flex flex-col">
                <span className="text-[1rem] tracking-[.15px] text-white">
                  {name}
                </span>
                <span className="text-[14px] tracking-[.15px] text-white text-opacity-50">
                  {`@${username}`}
                </span>
              </div>
            </div>

            <button
              className={`${
                isFollowing === FOLLOW_STATUS.FOLLOW
                  ? "contained-btn font-semibold tracking-[.15px]"
                  : "outline-btn"
              } rounded-full h-[29px] my-[0.5px] px-[10.75px] font-button`}
            >
              {isFollowing === FOLLOW_STATUS.FOLLOW ? "Following" : "Follow"}
            </button>
          </div>
        </React.Fragment>
      );
    });
  };

  const ProfileTabs: JSX.Element[] = React.useMemo(() => {
    return Object.entries(TAB_TYPE).map(([, value], index) => {
      return (
        <div
          key={index}
          className="w-1/2 relative cursor-pointer h-[67px] mx-[1px]"
        >
          <div
            className={`text-[16px] h-full flex items-end justify-center pb-2.5  ${
              value === TAB_TYPE.FOLLOWERS
                ? "tracking-[.6px]"
                : "tracking-[.15px]"
            }  ${tabIndex === value ? "text-white" : "text-appTextGrey"}`}
            onClick={() => {
              setTabIndex(value);
            }}
          >
            <span className=""> {TAP_TYPE_TEXT[value]}</span>
          </div>

          <div
            className={`absolute w-full h-[2px] top-[63px] transition-colors ${
              tabIndex === value
                ? "left-0 bg-white font-bold"
                : "left-50 bg-appBorderGrey"
            }`}
          ></div>
        </div>
      );
    });
  }, [tabIndex]);

  const skeleton = React.useMemo(() => {
    return Array.from<number>({ length: 12 }).map((item, index) => {
      return (
        <div
          key={`skeleton_${index}`}
          className="flex justify-between items-center px-4"
        >
          <div className="w-full inline-flex items-center my-2 mr-[px]">
            <Skeleton
              variant="rounded"
              sx={{
                width: "40px",
                height: "40px",
                marginRight: "15px",
                bgcolor: "grey.900",
              }}
            />
            <div className="flex flex-col">
              <Skeleton
                variant="text"
                sx={{
                  width: "200px",
                  bgcolor: "grey.900",
                  fontSize: "1rem",
                }}
              />

              <Skeleton
                variant="text"
                sx={{
                  width: "200px",
                  bgcolor: "grey.900",
                  fontSize: "1rem",
                }}
              />
            </div>
          </div>
        </div>
      );
    });
  }, []);

  let followerUsers = null;
  if (
    !isFetchingFollower &&
    Array.isArray(followerData?.data) &&
    followerData.data.length > 0
  ) {
    followerUsers = makeFollowHtml(followerData.data);
  }

  let followingUsers = null;
  if (
    !isFetchingFollowing &&
    Array.isArray(followingData?.data) &&
    followingData?.data.length > 0
  ) {
    followingUsers = makeFollowHtml(followingData.data);
  }

  const userHtml =
    tabIndex === TAB_TYPE.FOLLOWERS ? followerUsers : followingUsers;

  return (
    <div className="min-w-[375px] max-w-[375px] h-screen bg-appDarkGrey hidden desktop:block">
      <div className="flex pb-6">{ProfileTabs}</div>

      <div className="flex flex-col overflow-y-scroll max-h-full -mt-[1.75px]">
        {isFetchingFollower || isFetchingFollowing ? skeleton : userHtml}
      </div>
    </div>
  );
};

export default Follower;
