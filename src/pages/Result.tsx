import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchUser } from "../api/user";

const Result = () => {
  let [params] = useSearchParams();
  const page = params.get("page") ?? "1";
  const pageSize = params.get("pageSize") ?? "10";
  const keyword = params.get("keyword") ?? "";
  const data = useSearchUser(page, pageSize, keyword);
  console.log("data", data);

  return (
    <>
      <div className="outline-white outline-4">Result</div>
    </>
  );
};

export default Result;
