const authRouters = require("./auth");
const taskRouters = require("./task");

const routes = (app) => {
  app.use("/api/auth",authRouters);
  app.use("/api/task", taskRouters);
};

module.exports = routes;
