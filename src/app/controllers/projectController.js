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
    if (!bearerToken) return res.status.json({ loggedIn: false });
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
       const projectWithFilterName = data.projects.filter(item => item.title === projectName)
       res.json(projectWithFilterName)
    })
      .catch((err) => console.log(err));
  }
}

module.exports = new ProjectController();
