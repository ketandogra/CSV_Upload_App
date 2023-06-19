const Files = require("../models/files");

// function to render home page
module.exports.homePage = async function (req, res) {
  try {
    let file = await Files.find({});
    return res.render("home", {
      files: file,
      title: "Home",
    });
  } catch (error) {
    console.log("Error while rendering home page:", err);
  }
};
