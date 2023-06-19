const fs = require("fs");
const csvParser = require("csv-parser");
const Files = require("../models/files");
const path = require("path");

// uploading function to store file in database

module.exports.upload = async (req, res) => {
  try {
    //file is not present
    if (!req.file) {
      req.flash("error", "No files were uploaded.");
      return res.status(400).send("No files were uploaded.");
    }

    // file is not csv
    if (req.file.mimetype != "text/csv") {
      console.log("Select CSV files only.");
      return res.status(400).send("Select CSV files only.");
    }

    //parser the uploaded csv file and store it in array

    let file = await Files.create({
      fileName: req.file.originalname,
      filePath: req.file.path,
      file: req.file.filename,
    });
    console.log("success", "File uploaded successfully!.");
    return res.redirect("/");
  } catch (error) {
    console.log("error", `Error in while uploading file ${error}`);

    res.status(500).send("Internal server error");
  }
};

//exporting function to open file viwer page

module.exports.view = async function (req, res) {
  try {
    let csvFile = await Files.findOne({ _id: req.params.id });
    // console.log(csvFile);
    const results = [];
    const header = [];
    fs.createReadStream(path.join(__dirname, "../", csvFile.filePath))
      .pipe(csvParser())
      .on("headers", (headers) => {
        headers.map((head) => {
          header.push(head);
        });

        // console.log(header);
      })
      .on("data", (data) => results.push(data))
      .on("end", () => {
        // console.log(Object.keys(results));
        // console.log(results);

        res.render("file_viewer", {
          title: "File Viewer",
          fileName: csvFile.fileName,
          headers: header,
          data: results,
          length: results.length,
        });
      });
  } catch (err) {
    console.log("Error while viewing file", err);
    res.status(500).send("Internal server error");
  }
};

// export function to delete the file
module.exports.delete = async function (req, res) {
  try {
    let file = await Files.findById(req.params.id);
    console.log(file);

    if (file) {
      await Files.deleteOne({ _id: req.params.id });
      return res.redirect("back");
    } else {
      console.log("File not found");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error in fileControler/delete", err);
    return;
  }
};
