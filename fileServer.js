const {createServer} = require('http');
const formidable = require('formidable');
const fs = require('fs');

const streamFile = (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  req.on("data", chunk =>
  res.write(chunk.toString()));
  req.on("end", () => response.end());
};

const serverFunc = (req, res) => {
  if (req.url == '/fileupload') {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      const oldpath = files.filetoupload.path;
      const newpath = 'C:/Files/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }};

let server = createServer(serverFunc);
server.listen(8080); 
exports.server = () => {
  return server;
};