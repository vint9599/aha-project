import searchUser1 from "../assets/searchUser1.png";
import searchUser2 from "../assets/searchUser2.png";
import searchUser3 from "../assets/searchUser3.png";

const emptySearchUser = Array.from({ length: 300 }).fill(0);

export const searchUsers = emptySearchUser.map((item, index) => {
  let avetar = "";
  if (index % 3 === 0) {
    avetar = searchUser1;
  } else if (index % 3 === 1) {
    avetar = searchUser2;
  } else {
    avetar = searchUser3;
  }
  return {
    avetar,
    title: "",
    userName: "",
  };
});
