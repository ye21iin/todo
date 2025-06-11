"use client";

import { useQuery } from "@tanstack/react-query";
import { useUpdateTodoMutation, useDeleteTodoMutation } from "../../lib/hooks/mutation";
import type { Todo } from "./types";

const Todos = () => {
  const { data, isPending, error } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () => fetch("/api/todos").then((res) => res.json()),
  });

  const updateTodoMutation = useUpdateTodoMutation();
  const deleteTodoMutation = useDeleteTodoMutation();

  const handleToggleComplete = (todo: Todo) => {
    updateTodoMutation.mutate({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  if (isPending) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!data || data.length === 0) return <div>작성된 할 일이 없습니다.</div>;

  return (
    <div>
      <ul>
        {data.map((todo) => (
          <li key={todo.id} className="flex items-center gap-2">
            <span className={todo.completed ? "line-through" : ""}>
              {todo.title}
            </span>
            <button
              onClick={() => handleToggleComplete(todo)}
              disabled={updateTodoMutation.isPending}
            >
              {todo.completed ? "취소" : "완료"}
            </button>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              disabled={deleteTodoMutation.isPending}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
