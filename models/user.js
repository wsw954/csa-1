import mongoose from "mongoose";

const { Schema } = mongoose;

// Base User Schema
const userOptions = { discriminatorKey: "userType" }; // This will determine if it's a Buyer or Dealer

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 50,
    },
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 70,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 70,
    },
    streetAddress1: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    streetAddress2: {
      type: String,
      minlength: 2,
      maxlength: 100,
    },
    city: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    state: {
      type: String,
      required: true,
      length: 2,
    },
    zip: {
      type: String,
      required: true,
      match: /^\d{5}$/,
    },
    phone: {
      type: String,
      required: true,
      match: /^(\+\d{1,3}[- ]?)?\d{10}$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    },
    firebaseUID: { type: String, required: true, unique: true },
  },
  userOptions
);

// const User = mongoose.model("User", userSchema);

// Buyer Schema
const buyerSchema = new Schema({
  creditScore: {
    type: Number,
    min: 300,
    max: 850,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
});

// const Buyer = User.discriminator("Buyer", buyerSchema);

// Dealer Schema
const dealerSchema = new Schema({
  dealershipName: {
    type: String,
    required: true,
  },
  mainBrand: {
    type: String,
    required: true,
  },
});

// const Dealer = User.discriminator("Dealer", dealerSchema);

const User = mongoose.models.User || mongoose.model("User", userSchema);
const Buyer = mongoose.models.Buyer || User.discriminator("Buyer", buyerSchema);
const Dealer =
  mongoose.models.Dealer || User.discriminator("Dealer", dealerSchema);

export { User, Buyer, Dealer };
