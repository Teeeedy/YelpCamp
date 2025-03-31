const joi = require("joi");
const campgroundSchema = joi.object({
  campground: joi
    .object({
      title: joi.string().required(),
      price: joi.number().required().min(0),
      description: joi.string().required(),
      location: joi.string().required(),
    })
    .required(),
});

module.exports.campgroundSchema = campgroundSchema;
