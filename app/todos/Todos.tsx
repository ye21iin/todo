"use client";

import { useQuery } from "@tanstack/react-query";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const Todos = () => {
  const { data, isPending, error } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () => fetch("/api/todos").then((res) => res.json()),
  });

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
            <button>{todo.completed ? "취소" : "완료"}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
