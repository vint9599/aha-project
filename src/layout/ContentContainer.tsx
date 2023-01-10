interface Props {
  children?: JSX.Element | JSX.Element[];
}

const Container = ({ children }: Props) => {
  return (
    <>
      <div className="bg-appBlack w-[100%] h-screen text-white px-16 pt-12 overflow-y-scroll">
        {children}
      </div>
    </>
  );
};

export default Container;
