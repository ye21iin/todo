import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@/app/todos/types";

/**
 * @function useAddTodoMutation
 * @description 새로운 할 일을 추가하는 mutation hook
 */
export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, string>({
    mutationFn: async (newTitle: string) => {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, completed: false }),
      });
      if (!res.ok) {
        throw new Error("할 일 추가 실패");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}; 