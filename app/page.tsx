import TodoForm from "./todos/TodoForm";
import Todos from "./todos/Todos";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <h1 className="text-4xl font-bold text-center text-[#F67373] mb-8 tracking-wide">
        MY TODO LIST
      </h1>
      <TodoForm />
      <Todos />
    </div>
  );
}
