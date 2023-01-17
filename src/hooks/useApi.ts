import React from "react";

export default function useApi<T>(
  api: (...args: unknown[]) => Promise<T>,
  config: {
    fetchImmediately?: boolean;
  } = { fetchImmediately: true }
): {
  result: T | undefined;
  isFetching: boolean;
  refetch: () => void;
} {
  const [isFetching, setIsFetching] = React.useState<boolean>(
    config.fetchImmediately === true
  );
  const [result, setResult] = React.useState<T>();

  const refetch = React.useCallback(async () => {
    setIsFetching(true);
    const res = await api();

    setResult(res);
    setIsFetching(false);
  }, [api]);

  React.useEffect(() => {
    if (config?.fetchImmediately) {
      refetch();
    }
  }, []);

  return {
    result,
    isFetching,
    refetch,
  };
}
