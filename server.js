var express = require('express');
var app = express();
var port = 3000 || process.env.PORT;

app.use(express.static(__dirname + '/dist'));

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('app runing on http://localhost:' + port);
});