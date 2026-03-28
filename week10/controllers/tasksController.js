const pool = require('../db');

exports.listTasks = async (req, res, next) => {
  try {
    const [tasks] = await pool.query('SELECT * FROM tasks ORDER BY id');
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const [tasks] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (tasks.length === 0) {
      return res.status(404).json({ error: { code: 404, message: 'Task not found.' } });
    }
    res.json(tasks[0]);
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    
    // Validation
    if (!title) {
      return res.status(400).json({ error: { code: 400, message: 'Invalid task data.' } });
    }
    
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
      [title, description || null, status || 'pending']
    );
    
    const [newTask] = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(newTask[0]);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    
    // Check if task exists
    const [tasks] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (tasks.length === 0) {
      return res.status(404).json({ error: { code: 404, message: 'Task not found.' } });
    }
    
    // Build update query dynamically
    const updates = [];
    const values = [];
    
    if (title !== undefined) {
      updates.push('title = ?');
      values.push(title);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description);
    }
    if (status !== undefined) {
      updates.push('status = ?');
      values.push(status);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ error: { code: 400, message: 'No fields to update.' } });
    }
    
    values.push(req.params.id);
    await pool.query(`UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`, values);
    
    const [updatedTask] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    res.json(updatedTask[0]);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    // Check if task exists
    const [tasks] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (tasks.length === 0) {
      return res.status(404).json({ error: { code: 404, message: 'Task not found.' } });
    }
    
    await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
