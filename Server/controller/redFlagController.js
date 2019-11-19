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

  // view All RedFlag Created
  static viewRedFlag(req, res) {
    const records = [];
    redFlag.forEach((record) => {
      records.push(record);
    });
    return res.status(200).json(
      {
        status: 200,
        data: records,
      },
    );
  }

  // View Specific redFlag
  static viewSpecificRedFlag(req, res) {
    const { id } = req.params;
    const findRedFlag = redFlag.find((redFlag) => redFlag.id === parseInt(id));
    if (findRedFlag) {
      return res.status(200).json(
        {
          status: 200,
          data: findRedFlag,
        },
      );
    }
    res.status(404).json(
      {
        status: 404,
        error: 'The RedFlag you are looking for is not available',
      },
    );
  }
}

export default RedFlag;
