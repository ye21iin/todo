"use client"

import { useState } from "react";
import { useAddTodoMutation } from "../../lib/hooks/mutation";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
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
      {!isFormVisible ? (
        <button
          onClick={() => setIsFormVisible(true)}
          className="w-full px-4 py-2 bg-[#F67373] text-white rounded-md hover:bg-[#D55F5F] focus:outline-none focus:ring-2 focus:ring-[#3C3C43] focus:ring-opacity-50"
        >
          할 일 추가하기
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <textarea
            placeholder="할 일을 입력하세요. (최대 19자)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={19}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C3C43] placeholder-gray-500 resize-none text-gray-800"
          />
          <label className={`text-sm text-right ${title.length > 19 ? 'text-red-500' : 'text-gray-600'}`}>
            {title.length} / 19
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={addTodoMutation.isPending}
              className="flex-1 px-4 py-2 bg-[#F67373] text-white rounded-md hover:bg-[#D55F5F] focus:outline-none focus:ring-2 focus:ring-[#3C3C43] focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {addTodoMutation.isPending ? "추가 중..." : "추가"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsFormVisible(false);
                setTitle("");
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3C3C43] focus:ring-opacity-50"
            >
              닫기
            </button>
          </div>
        </form>
      )}
      {addTodoMutation.isError && (
        <div className="mt-2 text-red-600 text-sm">에러: {addTodoMutation.error?.message}</div>
      )}
    </section>
  );
};

export default TodoForm;