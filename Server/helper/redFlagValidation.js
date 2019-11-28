import Joi from '@hapi/joi';

const redFlagSchema = Joi.object().keys({
  id: Joi.number(),
  createdOn: Joi.required(),
  title: Joi.string().trim().regex(/^[a-zA-Z]{3,20}$/).required(),
  type: Joi.string().trim().regex(/^[a-zA-Z]{3,20}$/).required(),
  comment: Joi.string().trim().required(),
  location: Joi.string().trim().required(),
  status: Joi.string().trim().regex(/^[a-zA-Z]{3,20}$/).required(),
  userId: Joi.number(),
});

export default redFlagSchema;
