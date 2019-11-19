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

  // update comment
  static updateComment(req, res) {
    if (req.body.comment) {
      const { comment } = req.body;
      const { id } = req.params;
      const findRedFlag = redFlag.find((redFlag) => redFlag.id === parseInt(id) && redFlag.status === 'draft');
      if (findRedFlag) {
        const updateComment = {
          id: findRedFlag.id,
          title: findRedFlag.title,
          type: findRedFlag.type,
          comment,
          location: findRedFlag.location,
          status: findRedFlag.status,
        };
        redFlag[redFlag.indexOf(findRedFlag)] = updateComment;
        return res.status(200).json({
          status: 200,
          data: {
            id: findRedFlag.id,
            message: 'Updated RedFlag record\s comment',
          },
        });
      }
      return res.status(404).json({ status: 404, message: 'The redFlag is not found or is already marked by authorities.' });
    }
    return res.status(400).json({ status: 400, message: 'comment can not be empty' });
  }

  // Update location
  static updateLocation(req, res) {
    const { id } = req.params;
    if (req.body.location) {
      const { location } = req.body;
      const findRedFlag = redFlag.find((redFlag) => redFlag.id === parseInt(id));
      if (findRedFlag && findRedFlag.status === 'draft') {
        const updateLocation = {
          id: findRedFlag.id,
          title: findRedFlag.title,
          type: findRedFlag.type,
          comment: findRedFlag.comment,
          location,
          status: findRedFlag.status,

        };
        redFlag[redFlag.indexOf(findRedFlag)] = updateLocation;
        return res.status(200).json({
          status: 200,
          data: [{
            id: findRedFlag.id,
            message: "Updated redFlag record's location",
          }],
        });
      }
      return res.status(404).json({ status: 404, message: 'The redFlag is not found or is already marked by authorities.' });
    }
    return res.status(400).json({ status: 400, message: 'location can not be empty' });
  }

  // Delete a specific redFlag
  static deleteSpecificRedFlag(req, res) {
    const { id } = req.params;
    const findRedFlag = redFlag.find((redFlag) => redFlag.id === parseInt(id) && redFlag.status === 'draft');
    if (findRedFlag) {
      const findUser = userModel.find((user) => user.email === req.user.email);
      const userId = findUser.id;
      if (findRedFlag.userId === userId) {
        const index = redFlag.indexOf(findRedFlag);
        redFlag.splice(index, 1);
        return res.status(200).json({
          status: 200,
          data: [{
            id,
            message: 'redFlag record has been deleted',
          }],

        });
      }
      return res.status(403).json({ status: 403, message: 'Only the user who created the ​red-flag is the one to delete the record.' });
    }
    return res.status(404).json({ status: 404, message: 'The redFlag is not found or is already marked by authorities.' });
  }
}

export default RedFlag;
