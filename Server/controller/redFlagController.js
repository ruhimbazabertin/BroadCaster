import express from 'express';
import moment from 'moment';
import redFlag from '../model/redFlagModel';
import userModel from '../model/userModel';
import redFlagSchema from '../helper/redFlagValidation';
import generateToken from '../helper/generateToken';

class RedFlag {
  // Create a new RedFlag
  static createRedFlag(req, res) {
    const {
      title, type, comment, location, status,
    } = req.body;
    const id = redFlag.length + 1;
    const finduserEmail = req.user.email;
    const user = userModel.find((user) => user.email === finduserEmail);
    const userId = user.id;
    const createdOn = moment().format('LLL');
    const newRedFlag = redFlagSchema.validate({
      id, createdOn, title, type, comment, location, status, userId,
    });
    if (newRedFlag.error) {
      return res.status(400).json({ status: 400, error: newRedFlag.error.details[0].message });
    }
    redFlag.push(newRedFlag.value);
    return res.status(201).json({
      status: 201,
      data: newRedFlag.value,
      message: 'RedFlag created successifully',
    });

  }


}

export default RedFlag;
