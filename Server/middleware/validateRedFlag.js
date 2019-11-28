import moment from 'moment';
import redFlagSchema from '../helper/redFlagValidation';
import userModel from '../model/userModel';
import redFlagModel from '../model/redFlagModel';

class ValidateRedFlag {
  static validate(req, res, next) {
    const {
      title, type, comment, location, status,
    } = req.body;
    const id = redFlagModel.length + 1;
    const createdOn = moment().format('LLL');
    const finduserEmail = req.user.email;
    const user = userModel.find((user) => user.email === finduserEmail);
    const userId = user.id;
    const newRedFlag = redFlagSchema.validate({
      id, createdOn, title, type, comment, location, status, userId,
    });
    if (newRedFlag.error) {
      return res.status(400).json({ status: 400, error: newRedFlag.error.details[0].message });
    }
    req.newRedFlag = newRedFlag;
    next();
  }
}

export default ValidateRedFlag.validate;
