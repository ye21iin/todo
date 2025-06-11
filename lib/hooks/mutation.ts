import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@/app/todos/types";

/**
 * @function useAddTodoMutation
 * @description [추가] 새로운 할 일을 추가하는 mutation hook
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

/**
 * @function useUpdateTodoMutation
 * @description [수정] 투두의 완료 상태를 변경하는 mutation hook
 */
export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Partial<Todo>>({
    mutationFn: async (updatedTodo: Partial<Todo>) => {
      if (!updatedTodo.id) {
        throw new Error("업데이트할 Todo의 ID가 없습니다.");
      }
      const res = await fetch(`/api/todos/${updatedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!res.ok) {
        throw new Error("할 일 업데이트 실패");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

/**
 * @function useDeleteTodoMutation
 * @description [삭제] 투두를 삭제하는 mutation hook
 */
export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("할 일 삭제 실패");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}; 