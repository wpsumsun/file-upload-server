const express = require('express')
const fs = require('fs')
const app = express()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

app.get('/form', (req, res, next) => {
  const form = fs.readFileSync('./form.html', {encoding: 'utf8'});
  res.send(form);
})

app.post('/upload', upload.single('file'), (req, res, next) => {
  // req.file 是 `avatar` 文件的信息
  // req.body 将具有文本域数据，如果存在的话
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.set('Content-Type', 'application/json')
  res.send(req.file)
})

app.get('/preview/:filename',(req, res, next) => {
  const options = {
    root: __dirname + '/uploads/',
    dotfiles: 'deny',
    headers: {
      'Content-Type': 'image/jpeg',
    },
  }
  res.sendfile(req.params.filename, options, err => {
    console.log(err);
  })
})

app.listen(3000)