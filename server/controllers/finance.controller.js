const Finance = require('../models/finance.model');

//import the jwt so that we can decode the information sotred in the usertoken to get the id of the logged in user
const jwt = require("jsonwebtoken");

module.exports.findAllFinances = (req, res) => {
    Finance.find()
        .then(allDaFinances => res.json({ finance: allDaFinances }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.findFinancesBelongingToUser = (req, res) => {
    const decodedJwt = jwt.decode(req.cookies.usertoken, {complete:true});
    const userId = decodedJwt.payload.id
    console.log(userId)
    Finance.find({user_id: userId})
        .populate("user_id")
        .then(AllFinances => {
            res.json({finance: AllFinances})
        })
        .catch(err=> {
            res.json({err:err})
        })
}

module.exports.findAllFinancesByCategory = (req, res) => {
    Finance.findOne({category: req.params.category})
        .then(allDaFinances => res.json({ finance: allDaFinances }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.findOneSingleFinance = (req, res) => {
    Finance.findOne({ _id: req.params.id })
        .then(oneSingleFinance => res.json({ finance: oneSingleFinance }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.createNewFinance = (req, res) => {
    console.log(req.body)
    console.log("COOKIES->", req.cookies)

    //use the jwt to decode the cookie
    const decodedJwt = jwt.decode(req.cookies.usertoken, {complete:true});
    const userId = decodedJwt.payload.id
    console.log(userId)

    let expense = new Finance(req.body)
    expense.user_id = userId;
    // const user_id = req.body.user_id;
    Finance.create(expense)
        .then(newlyCreatedFinance => res.json({ finance: newlyCreatedFinance }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.updateExistingFinance = (req, res) => {
    Finance.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedFinance => res.json({ finance: updatedFinance }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.deleteAnExistingFinance = (req, res) => {
    Finance.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}
