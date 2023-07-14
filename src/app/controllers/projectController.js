const checkJWT = require("../../helper/checkJWT");
const getTime = require("../../helper/getTime");
const removeBearer = require("../../helper/removeBearer");
const taskModel = require("../models/task");

class ProjectController {
  getAllProjects(req, res) {
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
      .then((data) => res.json(data.projects))
      .catch((err) => {
        res.status(500).json({
          message: "Server Error",
        });
      });
  }

  getSingleProject(req, res) {
    const bearerToken = req.header("authorization");
    if (!bearerToken) return res.status(401).json({ loggedIn: false });
    const token = removeBearer(bearerToken);
    const user = checkJWT(token);
    if (!user)
      return res.status(401).json({
        loggedIn: false,
      });
    const email = user._id;
    const projectName = req.params.id;

    taskModel
      .findOne({
        email,
      })
      .then((data) => {
        const projectWithFilterName = data.projects.filter(
          (item) => item.title === projectName
        );
        res.json(projectWithFilterName);
      })
      .catch((err) => console.log(err));
  }

  updateProject(req, res) {
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
    taskModel
      .findOne({
        email,
      })
      .then((data) => {
        const cloneProjects = [...data.projects];

        const projectIdx = cloneProjects.findIndex(
          (item) => item.title === project.oldProject || item.title === project.project
        );
        console.log(projectIdx)
        const taskIndex = cloneProjects[projectIdx].tasks.findIndex(
          (item) => project._id === item._id.toString()
        );
        cloneProjects[projectIdx].tasks.splice(taskIndex, 1);
        const projectIdxNew = cloneProjects.findIndex(
          (item) => item.title === project.project
        );
        cloneProjects[projectIdxNew].tasks.push(project);
        console.log(cloneProjects[projectIdx].tasks);

        taskModel
          .updateOne(
            {
              email,
            },
            {
              projects: cloneProjects,
            }
          )
          .then(
            taskModel
              .findOne({
                email,
              })
              .then((data) => res.json(data))
          );
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json("Error")
      });
  }
}

module.exports = new ProjectController();
