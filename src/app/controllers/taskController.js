const checkJWT = require("../../helper/checkJWT");
const getTime = require("../../helper/getTime");
const removeBearer = require("../../helper/removeBearer");
const taskModel = require("../models/task");

class TaskController {
  getAllTask(req, res) {
    const bearerToken = req.header("authorization");
    if (!bearerToken) return res.status(401).json({ loggedIn: false });
    const token = removeBearer(bearerToken);
    const user = checkJWT(token);
    if (!user)
      return res.status(401).json({
        loggedIn: false,
      });
    const email = user._id;
    taskModel
      .findOne({ email })
      .then((data) => res.json(data.toObject()))
      .catch((err) => {
        res.status(500).json({
          message: "Server Error",
        });
      });
  }

  addTask(req, res) {
    const bearerToken = req.header("authorization");
    if (!bearerToken) return res.status(401).json({ loggedIn: false });
    const token = removeBearer(bearerToken);
    const user = checkJWT(token);
    if (!user)
      return res.status(401).json({
        loggedIn: false,
      });
    const email = user._id;
    const newTask = req.body.newTask;
    const project = req.body.project;
    const projectId = req.body.projectId;
    taskModel.findOne({ email }).then((data) => {
      const cloneData = { ...data.toObject() };
      const projectIdx = cloneData.projects.findIndex(
        (item) => item.title === project && item._id.toString() === projectId
      );
      cloneData.projects[projectIdx].tasks.push(newTask);
      console.log(cloneData);
      taskModel
        .updateOne({ email }, { projects: cloneData.projects })
        .then(() => {
          taskModel
            .findOne({ email })
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json("Server Error"));
        });
    });
  }

  updateTask(req, res) {
    const bearerToken = req.header("authorization");
    if (!bearerToken) return res.status(401).json({ loggedIn: false });
    const token = removeBearer(bearerToken);
    const user = checkJWT(token);
    if (!user)
      return res.status(401).json({
        loggedIn: false,
      });
    const email = user._id;
    taskModel
      .updateOne(
        { email },
        {
          projects: req.body.projects,
        }
      )
      .then(() => {
        taskModel
          .findOne({ email })
          .then((data) => res.json(data))
          .catch((err) => res.status(500).json("Server Error"));
      })
      .catch((err) => res.status(500).json("Server Error"));
  }

  getTaskWithFilters(req, res) {
    const bearerToken = req.header("authorization");
    if (!bearerToken) return res.status.json({ loggedIn: false });
    const token = removeBearer(bearerToken);
    const user = checkJWT(token);
    if (!user)
      return res.status(401).json({
        loggedIn: false,
      });
    const email = user._id;
    taskModel
      .findOne({ email })
      .then((data) => {
        const now = Date.now();
        const currentDay = getTime(now);
        const allProjects = data.projects.map((item) => [...item.tasks]);
        const allTasks = allProjects.flat(1); // merge all nested array to single array
        const todayTask = allTasks.filter((item) => {
          const taskDate = getTime(item.date);
          if (
            item.date === now ||
            (item.date < now &&
              taskDate.date === currentDay.date &&
              taskDate.month === currentDay.month &&
              taskDate.year === currentDay.year)
          )
            return true;
          return false;
        });

        const overdueTask = allTasks.filter((item) => {
          const taskDate = getTime(item.date);
          console.log("overdue", taskDate.month !== currentDay.month);
          if (
            item.date < now &&
            (taskDate.date !== currentDay.date ||
              taskDate.month !== currentDay.month ||
              taskDate.year !== currentDay.year)
          )
            return true;
          return false;
        });

        const upcomingTask = allTasks.filter((item) => {
          if (item.date > now) return true;
          return false;
        });

        res.json({
          today: todayTask,
          overdue: overdueTask,
          upcoming: upcomingTask,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("server error");
      });
  }

  removeTaskWithTaskId(req, res) {
    const bearerToken = req.header("authorization");
    if (!bearerToken) return res.status(401).json({ loggedIn: false });
    const token = removeBearer(bearerToken);
    const user = checkJWT(token);
    if (!user)
      return res.status(401).json({
        loggedIn: false,
      });
    const email = user._id;
    const projectName = req.body.projectName;
    const _id = req.body._id;
    taskModel
      .findOne({
        email,
      })
      .then((data) => {
        const cloneData = JSON.parse(JSON.stringify(data));
        const projectIndex = data.projects.findIndex(
          (item) => item.title === projectName
        );
        if (projectIndex < 0) return;
        const taskIndex = data.projects[projectIndex].tasks.findIndex(
          (item) => _id === item._id.toString()
        );
        cloneData.projects[projectIndex].tasks.splice(taskIndex, 1);
        taskModel
          .updateOne(
            { email },
            {
              projects: cloneData.projects,
            }
          )
          .then(() => {
            taskModel
              .findOne({ email })
              .then((data) => res.json(data))
              .catch((err) => res.status(500).json("Server Error"));
          })
          .catch((err) => res.status(500).json("Server Error"));
      });
  } //require projectName && task _id

  updateSubTask(req, res) {
    const bearerToken = req.header("authorization");
    if (!bearerToken) return res.status(401).json({ loggedIn: false });
    const token = removeBearer(bearerToken);
    const user = checkJWT(token);
    if (!user)
      return res.status(401).json({
        loggedIn: false,
      });
    const email = user._id;
    const project = req.body.project;
    const _id = req.body._id;
    const subtask = req.body.newSubTask;
    taskModel
      .findOne({
        email,
      })
      .then((data) => {
        const projectIdx = data.projects.findIndex(
          (item) => item.title === project
        );
        const cloneData = { ...data.toObject() };
        const cloneProjectData = cloneData.projects[projectIdx];
        const taskIdx = cloneProjectData.tasks.findIndex(
          (item) => item._id.toString() === _id
        );
        cloneProjectData.tasks[taskIdx].subTask = subtask;
        taskModel
          .updateOne(
            {
              email,
            },
            {
              projects: cloneData.projects,
            }
          )
          .then(() => {
            taskModel
              .findOne({ email })
              .then((data) => res.json(data))
              .catch((err) => res.status(500).json("Server Error"));
          });
      });
  }
}

module.exports = new TaskController();
