import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
    id: Joi.number(),
    firstName: Joi.string().regex(/^[a-zA-Z]{3,10}$/).min(3).max(10).required(),
    lastName: Joi.string().regex(/^[a-zA-Z]{3,10}$/).min(3).max(10).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().trim().regex(/^[0-9]{10}$/).min(10).max(10).required(),
    userName   : Joi.string().alphanum().min(3).max(10).required(),
    password: Joi.string().min(3).required(),
    userType: Joi.string().valid('user', 'admin').required(),
});

export default userSchema;