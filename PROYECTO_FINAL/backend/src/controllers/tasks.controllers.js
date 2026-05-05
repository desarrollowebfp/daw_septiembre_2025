const Task = require("../models/task.model");

const getTasks = async (req, res) => {
  try {
    const { status, date, sort } = req.query;

    const filter = { user: req.user._id };

    if (status && ["pending", "completed"].includes(status)) {
      filter.status = status;
    }

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      filter.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    let query = Task.find(filter);

    if (sort === "date_asc") query = query.sort({ date: 1 });
    if (sort === "date_desc") query = query.sort({ date: -1 });
    if (sort === "status_asc") query = query.sort({ status: 1 });
    if (sort === "status_desc") query = query.sort({ status: -1 });

    const tasks = await query;
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: "Error obteniendo las tareas" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, date, status } = req.body;

    if (!title || !date) {
      return res
        .status(500)
        .json({ message: "El titulo y la fecha son campos obligatorios" });
    }

    const newTask = new Task({
      title,
      date,
      status,
      user: req.user._id,
    });

    const taskSaved = await newTask.save();
    return res.status(200).json(taskSaved);
  } catch (error) {
    return res.status(500).json({ error: "Error creando la tarea" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, date, status } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ error: "No se encuentra la tarea" });
    }

    if (title !== undefined) task.title = title;
    if (date !== undefined) task.date = date;
    if (status !== undefined) task.status = status;

    const taskUpdated = await task.save();
    return res.status(200).json(taskUpdated);
  } catch (error) {
    return res.status(500).json({ error: "Error creando la tarea" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ error: "No se encuentra la tarea" });
    }

    return res.status(200).json({ message: "Tarea borrada correctamente" });
  } catch (error) {
    return res.status(500).json({ error: "Error borrando la tarea" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
