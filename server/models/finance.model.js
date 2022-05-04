const mongoose = require('mongoose');


const FinanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        minlength: [3, "Name must be at least 3 characters long"]
    },
    date: {
        type: Date,
        required: [true, "Date is required!"],
        min: [1, "Date must be provided in the Form"]
    },
    category: {
        type: String,
        required: [true, "Category is required!"],
        minlength: [3, "Category must be at least 3 characters long"]
    },
    amount: {
        type: Number,
        required: [true, "Amount must be in the Form"],
        minlength: [0, "Amount must be provided in the Form!"]
    },
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},
    { timestamps: true }
)


const Finances = mongoose.model('Finances', FinanceSchema);

module.exports = Finances;

