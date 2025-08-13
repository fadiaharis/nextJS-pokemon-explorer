import { useRouter } from "next/router";

export function useQueryParams() {
  const router = useRouter();
  const query = router.query;

  const setQueryParams = (params: Record<string, string | number | undefined>) => {
    router.push({ pathname: router.pathname, query: { ...query, ...params } }, undefined, { shallow: true });
  };

  return { query, setQueryParams };
}
