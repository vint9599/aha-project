import Follow from "./Follow";

interface Props {
  children?: JSX.Element | JSX.Element[];
  displayFollow: boolean;
}

const Container = ({ children, displayFollow = false }: Props) => {
  return (
    <>
      <div className="bg-appBlack w-[100%] h-screen text-white px-16 pt-12 overflow-y-scroll">
        {children}
      </div>
      {displayFollow ? <Follow /> : null}
    </>
  );
};

export default Container;
