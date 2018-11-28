const express = require('express');
const path = require('path');
const fs = require('fs');
const upload = require('multer')({
    dest: '/tmp/uploads'
});

const app = express();
app.enable('trust proxy');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'File Metadata Microservice',
        url: `${req.protocol}://${req.headers.host}`
    });
});

app.post('/', upload.single('file'), (req, res) => {
    res.json({
        size: req.file.size
    });
    fs.unlink(req.file.path, (err) => {
        if (err) throw err;
    });
});

app.use(express.static(path.join(__dirname, 'public')));
var listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on ${listener.address().port}`);
});