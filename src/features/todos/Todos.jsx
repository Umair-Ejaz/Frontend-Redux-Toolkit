import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, deleteTodo } from "./todosSlice";

export default function Todos() {
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const handleEdit = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const handleSave = (id) => {
    if (editText.trim()) {
      // Delete old and re-add (since todosSlice has no update reducer)
      dispatch(deleteTodo(id));
      dispatch(addTodo(editText));
      setEditingId(null);
      setEditText("");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        📝 Redux Todo App
      </h1>

      {/* Input & Add Button */}
      <div className="flex mb-5">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-5 py-3 rounded-r-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            {editingId === todo.id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 mr-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <span
                onClick={() => dispatch(toggleTodo(todo.id))}
                className={`cursor-pointer select-none text-lg ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>
            )}

            <div className="flex gap-2">
              {editingId === todo.id ? (
                <button
                  onClick={() => handleSave(todo.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo.id, todo.text)}
                  className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
