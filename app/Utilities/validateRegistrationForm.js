

module.exports = (req, res, next) => {
    const fName = req.body.f_name,
        lName = req.body.l_name,
        username = req.body.username,
        email = req.body.email,
        password = req.body.password,
        password_2 = req.body.password_2;

    req.checkBody('f_name', 'First Name is Required').notEmpty();
    req.checkBody('l_name', 'Last Name is Required').notEmpty();
    req.checkBody('username', 'Username is Required').notEmpty();
    req.checkBody('email', 'Email is Invalid').isEmail();
    req.checkBody('password', 'Password is Required').notEmpty();
    req.checkBody('password_2', 'Passwords Must Match').equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
        res.render('users/register', {
            errors: errors
        });
    } else {
        next();
    }
}