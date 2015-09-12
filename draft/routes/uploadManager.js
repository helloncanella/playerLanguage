var options = {
  tmpDir: __dirname + '/../public/uploaded/tmp',
  uploadDir: __dirname + '/../public/uploaded/files',
  uploadUrl: '/uploaded/files/',
  storage: {
    type: 'local'
  }
};

var uploader = require('blueimp-file-upload-expressjs')(options);

module.exports = function(router) {
  router.get('/upload', function(req, res) {
    uploader.get(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  router.post('/upload', function(req, res) {
    console.log("obj");
    uploader.post(req, res, function(obj) {
      console.log(req);
      console.log(res);
      res.send(JSON.stringify(obj));
    });
  });

  router.delete('/uploaded/files/:name', function(req, res) {
    uploader.delete(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });
  return router;
}
