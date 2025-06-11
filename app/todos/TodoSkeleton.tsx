const TodoSkeleton = () => {
  return (
    <div className="max-w-md mx-auto my-4 p-4 bg-white rounded-lg shadow-md">
      <ul className="space-y-3">
        {[1, 2, 3].map((index) => (
          <li
            key={index}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-md shadow-sm animate-pulse"
          >
            <div className="size-6 rounded border border-gray-200 bg-gray-200"></div>
            <div className="flex-grow h-6 bg-gray-200 rounded ml-3"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoSkeleton