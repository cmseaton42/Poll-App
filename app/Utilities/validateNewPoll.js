

module.exports = (req, res, next) => {
    const title = req.body.title,
        options = req.body.options.split('\r\n');

    let arr = [];

    for (let option of options) {
        if (option !== '') arr.push(option);
    }

    req.checkBody('title', 'Title is Required').notEmpty();
    req.checkBody('options', 'Options are Required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        res.render('polls/new', {
            user: req.user,
            errors: errors
        })
    } else if (arr.length < 2) {
        req.flash('error_messages', 'You must include at least 2 options');
        console.log('red flag');
        res.redirect('/polls/new')
    } else {
        req.body.options = arr;
        next();
    }
}