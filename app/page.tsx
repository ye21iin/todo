import TodoForm from "./todos/TodoForm";
import Todos from "./todos/Todos";

export default function Home() {
  return (
    <div>
      <h1>TODO LIST</h1>
      <TodoForm />
      <Todos />
    </div>
  );
}
