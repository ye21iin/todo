"use client"

import { useState } from "react";
import { useAddTodoMutation } from "../../lib/hooks/mutation";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const addTodoMutation = useAddTodoMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodoMutation.mutate(title, {
        onSuccess: () => {
          setTitle("");
        },
      });
    }
  };

  return (
    <section className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto my-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="할 일을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C3C43]"
        />
        <button
          type="submit"
          disabled={addTodoMutation.isPending}
          className="px-4 py-2 bg-[#F67373] text-white rounded-md hover:bg-[#D55F5F] focus:outline-none focus:ring-2 focus:ring-[#3C3C43] focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {addTodoMutation.isPending ? "추가 중..." : "추가"}
        </button>
      </form>
      {addTodoMutation.isError && (
        <div className="mt-2 text-red-600 text-sm">에러: {addTodoMutation.error?.message}</div>
      )}
    </section>
  );
};

export default TodoForm;