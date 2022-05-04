const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


class UserController {
    getAllUsers = (req, res) => {
        User.find()
            .then(allUsers => {
                res.json({ results: allUsers })
            })
            .catch(err => {
                res.json({ error: err })
            })
    }

    register = (req, res) => {
        User.find({ email: req.body.email })
            .then(foundUser => {
                console.log("Response when finding USER", res)
                if (foundUser.length === 0) {
                    User.create(req.body)
                        .then(user => {
                            const userToken = jwt.sign({
                                id: user._id
                            }, process.env.SECRET_KEY);
                            res
                                .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                                    httpOnly: true
                                })
                                .json({ msg: "success!", user: user });
                        })
                        .catch(err => res.json(err));
                } else {
                    res.json({ errors: { email: { message: "This Email is already exist. Please use differnt Email Address" } } })
                }
            })
            .catch(err => {
                console.log("ERROR during Register", err)
            })


    }

    login = async (req, res) => {
        console.log("LOGGING IN")
        const user = await User.findOne({ email: req.body.email });

        if (user === null) {
            return res.json({ error: "User not found." });
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if (!correctPassword) {
            return res.json({ error: "Password is incorrect!" });
        }

        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);

        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    }

    logout = (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }

    getLoggedInUser = (req, res) => {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true })
        User.findOne({_id: decodedJWT.payload.id})
        .then(foundUser => {
            res.json({results: foundUser})
        })
        .catch(err => {
            res.json(err)
        })
    }

}

module.exports = new UserController();