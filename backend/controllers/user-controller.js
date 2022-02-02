const express = require("express");
const { validationResult } = require("express-validator");
const res = require("express/lib/response");

let counter = 0;

const HttpError = require("../model/error-model");
const User = require("../model/model");

// API for adding user data
const addUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpError(errors.array()[0].msg, 400));
    }
  } finally {
    counter = counter + 1;
  }

  const { name, email, mobile, job } = req.body;

  let existing;
  try {
    existing = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Server error", 500));
  }

  if (existing) {
    return next(new HttpError("User already  exists to this email, ", 422));
  }

  const createUser = new User({
    name,
    email,
    mobile,
    job,
  });

  try {
    await createUser.save();
  } catch (err) {
    return next(new HttpError("failed to add record , ", 422));
  }

  res.status(201).json({ message: "record save" });
};

//API for updating user data
const updateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpError(errors.array()[0].msg, 400));
    }
  } finally {
    counter = counter + 1;
  }

  const { email, mobile, job } = req.body;

  let updateUser;
  try {
    updateUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Server error", 500));
  }

  if (!updateUser) {
    return next(new HttpError("User doesn't  exists to this email, ", 404));
  }

  updateUser.mobile = mobile;
  updateUser.job = job;

  try {
    await updateUser.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not update user details ", 500)
    );
  }

  res.status(200).json({ message: "user details updated successfully" });
};

//API for Checking how many times user called add & show api
const numberOfCount = async (req, res, next) => {
  res.status(200).json({ count: counter });
};

exports.addUser = addUser;
exports.updateUser = updateUser;
exports.numberOfCount = numberOfCount;
