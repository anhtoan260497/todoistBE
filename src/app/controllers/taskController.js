const checkJWT = require("../../helper/checkJWT");
const getTime = require("../../helper/getTime");
const removeBearer = require("../../helper/removeBearer");
const taskModel = require("../models/task");

class TaskController {
  getAllTask(req, res) {
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
      .then((data) => res.json(data.toObject()))
      .catch((err) => {
        res.status(500).json({
          message: "Server Error",
        });
      });
  }

  updateProject(req, res) {
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
        const allProjects = data.projects.map(item => [...item.tasks])
        const allTasks = allProjects.flat(1) // merge all nested array to single array
        const todayTask = allTasks.filter((item) => {
          const taskDate = getTime(item.date);
          if (
            taskDate.date === currentDay.date &&
            taskDate.month === currentDay.month &&
            taskDate.year === currentDay.year
          )
            return true;
          return false;
        });
        const overdueTask = allTasks.filter(item => {
          const taskDate = getTime(item.date);
          if(item.date < now && taskDate.date < currentDay.date ) return true
          return false
        })

        const upcomingTask = allTasks.filter(item => {
          const taskDate = getTime(item.date);
          if(item.date > now ) return true
          return false
        })
        res.json({
          today : todayTask,
          overdue : overdueTask,
          upcoming : upcomingTask
        });
        
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json("server error")
      });
  }
}

module.exports = new TaskController();
