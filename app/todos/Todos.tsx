"use client";

import { useQuery } from "@tanstack/react-query";
import { useUpdateTodoMutation, useDeleteTodoMutation } from "../../lib/hooks/mutation";
import type { Todo } from "./types";
import { Trash } from "lucide-react";
import { Checkbox } from '@headlessui/react';


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

  if (isPending) return <div className="text-center py-4 text-gray-600">로딩 중...</div>;
  if (error) return <div className="text-center py-4 text-red-600">에러가 발생했습니다: {error.message}</div>;
  if (!data || data.length === 0) return <div className="text-center py-4 text-gray-500">작성된 할 일이 없습니다.</div>;

  return (
    <div className="max-w-md mx-auto my-4 p-4 bg-white rounded-lg shadow-md">
      <ul className="space-y-3">
        {data.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between p-3 border border-gray-200 rounded-md shadow-sm transition-colors duration-200 
              ${todo.completed ? "bg-gray-100" : "bg-white"}`}
          >
            <Checkbox
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo)}
                className={`group block size-6 rounded border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#3C3C43]
                  ${todo.completed ? 'bg-[#3C3C43] border-[#3C3C43]' : 'bg-white border-gray-300'}`}
              >
                <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100 transition-opacity duration-200" viewBox="0 0 14 14" fill="none">
                  <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Checkbox>
            <span className={`flex-grow text-lg font-medium text-[#3C3C43] ml-3 ${todo.completed ? "line-through text-gray-500" : ""}`}>
              {todo.title}
            </span>
            <div className="flex gap-2 ml-4 items-center">
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                disabled={deleteTodoMutation.isPending}
                className="p-1 text-gray-500 rounded-md hover:text-[#F67373] transition-colors duration-200 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Trash size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
