interface Props {
  children?: JSX.Element | JSX.Element[];
}

const Container = ({ children }: Props) => {
  return (
    <>
      <div className="h-screen w-[100%] overflow-y-scroll bg-appBlack px-16 pt-12 text-white">
        {children}
      </div>
    </>
  );
};

export default Container;
