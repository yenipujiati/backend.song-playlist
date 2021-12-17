const PlaylistPayloadSchema = require("./schema");
const PlaylistsValidator = {
    validatePlaylistPayload: (payload) => {
        const validatationResult = PlaylistPayloadSchema.validate(payload);
        if (validatationResult.error) {
            throw new Error(validatationResult.error.message);
        }
    }
};

module.exports = PlaylistsValidator;