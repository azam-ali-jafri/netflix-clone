import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useFavourite = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/favourite", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useFavourite;
