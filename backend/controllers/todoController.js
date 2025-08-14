const { Todo } = require("../models");

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new todo
exports.createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const newTodo = await Todo.create({ text });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Toggle todo completion
exports.toggleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
