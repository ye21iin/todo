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
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="할 일을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" disabled={addTodoMutation.isPending}>
          {addTodoMutation.isPending ? "추가 중..." : "추가"}
        </button>
      </form>
      {addTodoMutation.isError && (
        <div style={{ color: "red" }}>에러: {addTodoMutation.error?.message}</div>
      )}
    </section>
  );
};

export default TodoForm;