-- ============================================
-- PART 1: Create Database
-- ============================================
CREATE DATABASE IF NOT EXISTS task_management_db;
USE task_management_db;

-- ============================================
-- PART 3: Create Tables
-- ============================================

-- Table 1: users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- Table 2: projects
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table 3: tasks
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    project_id INT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- ============================================
-- PART 4: Insert Sample Data
-- ============================================

INSERT INTO users (name, email) VALUES
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com'),
('Carol White', 'carol@example.com');

INSERT INTO projects (name, description, user_id) VALUES
('Website Redesign', 'Modernize company website', 1),
('Mobile App', 'Build iOS and Android app', 2),
('Database Migration', 'Migrate legacy data to cloud', 1);

INSERT INTO tasks (title, status, project_id) VALUES
('Design homepage', 'completed', 1),
('Set up database', 'in progress', 3),
('Create user authentication', 'pending', 2),
('Write API endpoints', 'in progress', 2),
('Test mobile responsiveness', 'completed', 1);

-- ============================================
-- PART 5: Run Required Queries
-- ============================================

-- Query 1: Show all users
SELECT * FROM users;

-- Query 2: Show all projects
SELECT * FROM projects;

-- Query 3: Show all tasks
SELECT * FROM tasks;

-- Query 4: Show tasks with project names
SELECT t.title, t.status, p.name AS project_name
FROM tasks t
JOIN projects p ON t.project_id = p.id;

-- Query 5: Show projects with user names
SELECT p.name AS project_name, u.name AS user_name
FROM projects p
JOIN users u ON p.user_id = u.id;

-- Query 6: Show only completed tasks
SELECT * FROM tasks WHERE status = 'completed';

-- Query 7: Sort tasks alphabetically by title
SELECT * FROM tasks ORDER BY title ASC;