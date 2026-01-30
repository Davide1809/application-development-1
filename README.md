# application-development-1
  
## Week 3 Simple NodeJS Assignment

### Resources Used
- [Node.js Documentation](https://fullstackopen.com/en/part3)
- [npm Documentation](https://docs.npmjs.com/)
- AI assistance (GitHub Copilot) for troubleshooting and code explanations

### What does package.json do?
`package.json` is a file that describes your Node.js project. It is used by Node.js projects to manage project metadata, scripts, and dependencies. It defines the project name, version, entry point, scripts (like start and dev), and any packages required for the project. It is essential for sharing and running Node.js projects consistently across different environments.

### What is process.env?
`process.env` is a global object in Node.js that provides access to environment variables. These variables can be set outside the application and are used to configure the app without changing code. For example, `process.env.PORT` reads the PORT variable if set, or you can provide a default value in your code.

### What does npm start run?
`npm start` runs the command defined in the `start` script of a project's `package.json` file. In this project, it runs `node index.js`, which starts the Node.js program and prints the required information.

### Bugs or Errors Encountered
No significant bugs or errors were encountered during this assignment. The npm scripts and environment variable handling worked as expected.