const authRouters = require("./auth");
const taskRouters = require("./task");
const projectRouters = require("./project");

const routes = (app) => {
  app.use("/api/auth", authRouters);
  app.use("/api/task", taskRouters);
  app.use("/api/project", projectRouters);
};

module.exports = routes;
