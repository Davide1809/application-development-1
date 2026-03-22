# Task Management Database - Week 09

## Overview
This database represents a task management system where users create projects and organize tasks within those projects. It demonstrates fundamental relational database concepts including primary keys, foreign keys, and joins.

## Tables Created
1. **users** - Stores user information (id, name, email)
2. **projects** - Stores projects created by users (id, name, description, user_id)
3. **tasks** - Stores tasks belonging to projects (id, title, status, project_id)

## Relationships
- **One-to-Many (users → projects)**: One user can create many projects
- **One-to-Many (projects → tasks)**: One project can contain many tasks

## Primary Key
A primary key is a unique identifier for each record in a table. Every row must have a unique primary key value. In our tables, the `id` column serves as the primary key for users, projects, and tasks.

## Foreign Key
A foreign key is a column that references the primary key of another table, creating a relationship between tables. It ensures data integrity by only allowing values that exist in the referenced table. Examples:
- `projects.user_id` references `users.id`
- `tasks.project_id` references `projects.id`