const Joi = require('joi');

const SongPayloadSchema = Joi.object( {
    title: Joi.string().required(),
    year: Joi.number().min(1900).max(2021).required(),
    artist: Joi.string().required(),
    gendre: Joi.string().required(),
    duration: Joi.string().required()
});

module.exports = SongPayloadSchema;