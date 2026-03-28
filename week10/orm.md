# ORM Concept Reflection

## What problems does raw SQL create in large applications?

Raw SQL becomes difficult to maintain as applications grow because:
- **String concatenation for queries** becomes error-prone and repetitive
- **SQL injection vulnerabilities** require constant vigilance with parameterization
- **Database schema changes** force updates throughout multiple files rather than a single place
- **Query logic scattered** across many controller files makes testing and refactoring harder
- **Inconsistent error handling** for different query patterns
- **No type safety** for database responses — you don't know the shape of returned data until runtime
- **Duplicate code** for common patterns (filtering, pagination, relationships)

## What is an ORM in your own words?

An ORM (Object-Relational Mapping) is a layer that translates between your code's objects/classes and database tables/rows. Instead of writing SQL strings, you interact with JavaScript objects that automatically handle the database communication behind the scenes. It's like a translator that lets you work with data the way your programming language naturally understands it, rather than writing SQL.

## What does an ORM replace or simplify?

An ORM replaces or simplifies:
- **Raw SQL strings** with method calls like `.find()`, `.create()`, `.update()` that feel like JavaScript
- **Manual parameterization** — the ORM handles escaping automatically
- **Table-to-object mapping** — you get typed objects instead of plain arrays/objects
- **Schema management** — many ORMs support migrations to version-control your database structure
- **Relationships** — instead of writing JOIN queries, you can access related data with objects: `user.tasks` or `task.project`
- **Common queries** — built-in methods for pagination, filtering, sorting without re-writing WHERE clauses

## When would you NOT want to use an ORM?

You might skip an ORM when:
- **Performance is critical** — raw SQL queries can be fine-tuned and optimized better than ORM-generated queries
- **Complex queries** — some reports or analytics queries are easier to write in raw SQL than through an ORM
- **Simple CRUD apps** — small projects might not justify the ORM overhead and learning curve
- **Schema is very dynamic** — if your database structure changes frequently and unpredictably, an ORM's strict modeling gets in the way
- **You need full control** — when you need to do something the ORM doesn't support well, you're stuck
- **Learning/prototyping** — for educational purposes like this week's assignment, raw SQL teaches you what's really happening underneath

