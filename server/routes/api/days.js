const express = require('express');
const mysql = require('mysql');
const cron = require('node-cron');
const router = express.Router();


var _host = '';

if (process.env.NODE_ENV === 'production') {
    _host = 'localhost';
} else {
    _host = '64.20.60.126';
}


const db = mysql.createConnection({
    host: _host,
    port: '3306',
    user: 'orgohelp_bingus',
    password: 'moZZarella@13',
    database: 'orgohelp_trackerdays'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    var date = new Date("2021-12-29T05:00:00.000Z");
    let formatedDate = `${date.getUTCFullYear()}`;

    if (date.getMonth() < 9)
        formatedDate += `-0${date.getMonth() + 1}`;
    else
        formatedDate += `-${date.getMonth() + 1}`

    if (date.getDate() < 10)
        formatedDate += `-0${date.getDate()}`;
    else
        formatedDate += `-${date.getDate()}`

    console.log(`${date}`);
});

//cron.schedule("0 0 0 * * *", () => {

//});


router.get('/today', (req, res) => {
    let date = new Date();
    let formatedDate = `${date.getUTCFullYear()}`;

    if (date.getMonth() < 9)
        formatedDate += `-0${date.getMonth() + 1}`;
    else
        formatedDate += `-${date.getMonth() + 1}`

    if (date.getDate() < 10)
        formatedDate += `-0${date.getDate()}`;
    else
        formatedDate += `-${date.getDate()}`

    let sql = `SELECT * FROM days WHERE ID='${formatedDate}'`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
});



module.exports = router;