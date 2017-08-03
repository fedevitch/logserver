var express = require('express');
var router = express.Router();

var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

var fs = require('fs');

router.post('/', upload.array(), (req, res, next) => {
  console.log(req.headers['user-agent'], " - data received: ", req.body);
var date = new Date();

var binary = [];
res.on('data', function(chunk){
  binary.push(chunk);
}).on('end', function() {
        var buffer = Buffer.concat(binary);
        fs.appendFile('data.txt', "\n" + date.toISOString() + " " + buffer.toJSON(), function(err){
          if(err) throw err;

          console.log('data saved');
        })
    });
  fs.appendFile('data.txt', "\n" + date.toISOString() + " " + JSON.stringify(req.body), function(err){
    if(err) throw err;

    console.log('data saved');
  })
  res.status(200).send({
    serverResponse: "Log info received"
  });
});

router.get('/', upload.array(), (req, res, next) => {
  fs.createReadStream('data.txt').pipe(res);
});

router.post('/confirm', upload.array(), (req, res, next) => {
  console.log(req.headers['user-agent'], " - Confirm received: ", req.body);
  res.sendStatus(200);
})


module.exports = router;
