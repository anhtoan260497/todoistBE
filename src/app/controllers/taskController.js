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

  updateTask(req, res) {
    const bearerToken = req.header("authorization");
    if (!bearerToken) return res.status.json({ loggedIn: false });
    const token = removeBearer(bearerToken);
    const user = checkJWT(token);
    if (!user)
      return res.status(401).json({
        loggedIn: false,
      });
    const email = user._id;
    console.log(req.body.tasks);
    taskModel
      .updateOne(
        { email },
        {
          tasks: req.body.tasks,
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

  getTaskWithFilter(req, res) {
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
        const todayTask = data.tasks.filter((item) => {
          const taskDate = getTime(item.date);
          if (
            taskDate.date === currentDay.date &&
            taskDate.month === currentDay.month &&
            taskDate.year === currentDay.year
          )
            return true;
          return false;
        });
        const overdueTask = data.tasks.filter(item => {
          const taskDate = getTime(item.date);
          if(item.date < now && taskDate.date < currentDay.date ) return true
          return false
        })

        const upcomingTask = data.tasks.filter(item => {
          const taskDate = getTime(item.date);
          if(item.date > now && taskDate.date > currentDay.date ) return true
          return false
        })
        res.json({
          today : todayTask,
          overdue : overdueTask,
          upcoming : upcomingTask
        });
        
      })
      .catch((err) => res.status(500).json("server error"));
  }
}

module.exports = new TaskController();
