"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Plus, CheckCircle2, Circle } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  
  useEffect(() => {
    localStorage.setItem("portfolio-todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    
    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white">
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="text-slate-400 text-sm">Stay organized and focused.</p>
        </div>

        {/* Input Form */}
        <form onSubmit={addTodo} className="p-4 border-b border-slate-100 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all text-slate-800"
          />
          <button 
            type="submit"
            className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Plus size={24} />
          </button>
        </form>

        {/* List */}
        <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto">
          {todos.length === 0 ? (
            <div className="p-10 text-center text-slate-400">
              <p>No tasks yet. Add one above!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className="flex items-center justify-between p-4 group hover:bg-slate-50 transition-colors">
                <div 
                  className="flex items-center gap-3 cursor-pointer flex-1"
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.completed ? (
                    <CheckCircle2 className="text-emerald-500" size={20} />
                  ) : (
                    <Circle className="text-slate-300" size={20} />
                  )}
                  <span className={`text-slate-700 ${todo.completed ? 'line-through text-slate-400' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Stats */}
        {todos.length > 0 && (
          <div className="p-4 bg-slate-50 text-xs text-slate-500 flex justify-between border-t border-slate-100">
            <span>{todos.length} total tasks</span>
            <span>{todos.filter(t => t.completed).length} completed</span>
          </div>
        )}
      </div>
    </main>
  );
}
