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
          (item) =>
            item.title === project.oldProject || item.title === project.project
        );

        const taskIndex = cloneProjects[projectIdx].tasks.findIndex(
          (item) => project._id === item._id.toString()
        );
        cloneProjects[projectIdx].tasks.splice(taskIndex, 1);
        const projectIdxNew = cloneProjects.findIndex(
          (item) => item.title === project.project
        );
        cloneProjects[projectIdxNew].tasks.push(project);
        cloneProjects[projectIdxNew].tasks.sort((item1, item2) => {
          return item1.date - item2.date;
        });

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
        console.log(err);
        res.status(500).json("Error");
      });
  }

  addProject(req, res) {
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
    const color = req.body.color;
    taskModel
      .findOne({
        email,
      })
      .then((data) => {
        const idx = data.projects.findIndex((item) => item.title === project);
        if (idx >= 0) {
          return res.status(500).json({
            error: true,
            status: "Project name has exist",
          });
        }

        const newProject = {
          title: project,
          tasks: [],
          color,
        };

        const newProjects = [...data.projects, newProject];
        console.log(newProject);

        taskModel.updateOne({ email }, { projects: newProjects }).then(() => {
          taskModel
            .findOne({ email })
            .then((data) => {
              console.log(data);
              res.json(data);
            })
            .catch((err) => res.status(500).json("Error"));
        });
      });
  }

  deleteProject(req, res) {
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
    taskModel.findOne({ email }).then((data) => {
      const idx = data.projects.findIndex((item) => item.title === project);
      const cloneProject = { ...data.toObject() };
      cloneProject.projects.splice(idx, 1);
      taskModel
        .updateOne(
          { email },
          {
            projects: cloneProject.projects,
          }
        )
        .then(() => {
          taskModel
            .findOne({ email })
            .then((data) => res.json(data))
            .catch((err) => {
              res.status(500).json({
                status: "Delete task failed",
              });
            });
        });
    });
  }
}

module.exports = new ProjectController();
