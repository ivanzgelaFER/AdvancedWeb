const db = require('../db')

const authenticate = async (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
    const allowBrokenAuth = req.body.allowBrokenAuth == "On" ? true : false;
    let data = {};
    try {
        const sqlBrokenAuthByUsername = "select * from accounts where username = '" + username + "'";
        const user_username = await db.query(sqlBrokenAuthByUsername, []);

        if (allowBrokenAuth) {
            //brute force and wrong error message enabled
            if(user_username.rows[0] == undefined) {
                data.message = "Username is incorrect";
            } else {
                const sqlBrokenAuthPassword = "select * from accounts where username = '" + username + "' and password = '" + password + "'";
                const user_password = await db.query(sqlBrokenAuthPassword, []);
                if(user_password.rows[0] == undefined) {
                    data.message = "Password is incorrect";
                } else {
                    console.log("Login successful")
                    data.message = "Login successful";
                    data.user = user_password.rows[0];
                }
            }  
        } else {
            //brute force and wrong error message disabled
            if(user_username.rows[0] == undefined) {
                data.message = "Username or password is incorrect";
            } else {
                if(user_username.rows[0].attempts < 5) {
                    const sqlBrokenAuthPassword = "select * from accounts where username = '" + username + "' and password = '" + password + "'";
                    const user_password = await db.query(sqlBrokenAuthPassword, []);
                    if(user_password.rows[0] == undefined) {
                        data.message = "Username or password is incorrect";
                        const sqlBrokenAuthUpdateAttempts = "update accounts set attempts = attempts + 1 where username = '" + username + "'";
                        await db.query(sqlBrokenAuthUpdateAttempts, []);
                    } else {
                        console.log("Login successful")
                        data.message = "Login successful";
                        data.user = user_password.rows[0];
                    }
                } else {
                    data.message = "Account is locked due to too many failed login attempts (disabled brute force attack)";
                }
            }
        }
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        throw err
    }
}

module.exports = {
    authenticate,
}