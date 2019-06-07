var db = require("../models");
var fs = require("fs");
var path = require("path");

module.exports = function (app) {
 
  app.get("/api/deals", function (req, res) {
    db.Post.findAll({include: [veggieexchange.users]}).then(function (results) {
      res.json(results);
    });
  });

  app.post("/api/deals", function (req, res) {
    console.log(req.body);
    db.Deal.create(req.body).then(function (response) {
      // res.json(response);
      res.redirect('/');
    });
  });


  app.post("/api/users", function (req, res) {
    console.log(req.body);
    db.User.create(req.body).then(function (response) {
      // res.json(response);
      res.redirect('/');
    });
  });

  //upload user image
  //TODO save file path in database for user image url
  // app.post('/api/upload',
  //   db.upload.single("file" /* name attribute of <file> element in form */),
  //   (req, res) => {
  //     let tempPath = req.file.path;
  //     const username = 'zachary' //TODO replace this with the user
  //     let targetPath = path.join(__dirname, "../public/images/" + username + '.png');
  
  //     if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg") {
  //       fs.rename(tempPath, targetPath, err => {
  //         if (err) {console.log(err)};
  
  //         res
  //           .status(200)
  //           .contentType("text/plain")
  //           .end("File uploaded!");
  //       });
  //     } else {
  //       fs.unlink(tempPath, err => {
  //         if (err) return handleError(err, res);
  
  //         res
  //           .status(403)
  //           .contentType("text/plain")
  //           .end("Only .png or .jpg files are allowed!");
  //       });
  //     }
  //   }
  // );

  // //serve image
  // app.get("/api/:image", (req, res) => {
  //   fs.stat(path.join(__dirname, "../public/images/" + req.params.image), function(err, stat) { 
  //     if (err == null) { 
  //       res.sendFile(path.join(__dirname, "../public/images/" + req.params.image));
  //     } else  {
  //       res.sendFile(path.join(__dirname, "../public/images/default.png"));
  //     }
  //   }); 
  // });

  // Delete an example by id
  app.delete("/api/delete/:id", function (req, res) {
    db.Deal.destroy({ where: { id: req.params.id } }).then(function (response) {
      res.json(response);
    });
  })

  app.put("/api/deals", function (req, res) {
    console.log("id: " + req.body.id)
    db.Deal.update({
      status: req.body.status
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(response) {
      res.json(response);
    })
  })
}
