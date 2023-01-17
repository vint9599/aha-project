import React, { MutableRefObject } from "react";

function useInfiniteScroll(
  observeElementRef: MutableRefObject<IntersectionObserver | undefined>,
  isFetching: boolean
): {
  isVisible: boolean;
  handleObserveRef: (node: HTMLDivElement) => void;
} {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const handleObserveRef = React.useCallback(
    (node: HTMLDivElement) => {
      setIsVisible(false);

      if (isFetching) return;
      if (observeElementRef.current !== null)
        observeElementRef.current?.disconnect();

      observeElementRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      });

      if (node) observeElementRef.current.observe(node);
    },
    [observeElementRef, isFetching]
  );

  return { isVisible, handleObserveRef };
}

export default useInfiniteScroll;
