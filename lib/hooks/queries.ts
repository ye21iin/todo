import { useQuery } from "@tanstack/react-query";
import type { Todo } from "@/app/todos/types";

/**
 * @function useTodosQuery
 * @description 할 일 목록을 조회하는 query hook
 * @param filter - 필터링 조건 (전체: null, 완료: true, 미완료: false)
 */
export const useTodosQuery = (filter: boolean | null) => {
  return useQuery<Todo[]>({
    queryKey: ["todos", filter],
    queryFn: async () => {
      let url = "/api/todos";
      if (filter !== null) {
        url += `?completed=${filter}`;
      }
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch todos");
      }
      return res.json();
    },
  });
}; 