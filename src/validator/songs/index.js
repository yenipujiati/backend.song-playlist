const SongPayloadSchema = require("./schema");
const SongsValidator = {
    validateSongPayload: (payload) => {
       const validatationResult = SongPayloadSchema.validate(payload);
       if (validatationResult.error) {
           throw new Error(validatationResult.error.message);
       }
    }
};

module.exports = SongsValidator;