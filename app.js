
require('dotenv').config();
const chalk = require('chalk');
const express = require('express');

let app = express();

app.get('/', (req, res) => {
    res.send('youre up running');
});

app.listen(process.env.PORT, () => {
    console.log(
        chalk.white('Listening on Port: ') +
        chalk.bold.green(process.env.PORT) + 
        chalk.white('...')
    );
})