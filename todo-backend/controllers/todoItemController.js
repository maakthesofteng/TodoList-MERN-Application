const TodoItems = require("../models/todoItems");

exports.getTodoItems = async (req, res, next) => {
  const todoItems = await TodoItems.find();
  res.status(200).json(todoItems);
};

exports.createTodoItem = async (req, res, next) => {
  console.log(req.body);
  const { task, date } = req.body;
  const todoItem = new TodoItems({
    task,
    date
  });
  await todoItem.save();
  res.status(201).json(todoItem);
};

exports.deleteTodoItem = async (req, res, next) => {
  const { id } = req.params;
  const deletedItem = await TodoItems.findByIdAndDelete(id);
  res.status(204).json(deletedItem._id);
};

exports.markCompleted = async (req, res, next) => {
  const { id } = req.params;
  const todoItem = await TodoItems.findById(id);
  todoItem.completed = true;
  await todoItem.save();
  res.status(200).json(todoItem);
};
