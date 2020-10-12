const mongoose = require("mongoose");
const validator = require("validator");


const loanSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please provide your email address"],
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  loan_application_name: String,
  address: String,
  mobile_number: Number,
  loan_amount: Number,
  loan_start_date: {
      type: Date,
      default: Date.now()
  },
  loan_expiry_date: {
      type: Date,
      default: Date.now()
  },
  monthly_installments: Number
});


const User = mongoose.model("loan_details", loanSchema);

module.exports = User;
