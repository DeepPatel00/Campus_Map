const { constants } = require("../constants");


const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDTATION_ERROR:
            res.json({ title: "Validation failed", message: err.message, stackTrace: err.stack });
            break;
        case constants.NOT_FOUND:
            res.json({ title: "not found", message: err.message, stackTrace: err.stack });
        case constants.UNAUTHORIZED:
            res.json({ title: "UnAuthorized", message: err.message, stackTrace: err.stack });
        case constants.FORBIDEN:
            res.json({ title: "Forbiden", message: err.message, stackTrace: err.stack });
            case constants.SERVER_ERROR:
            res.json({ title: "server error", message: err.message, stackTrace: err.stack });
        default:
            console.log("No error, All good");
            break;
    }


};

module.exports = errorHandler;
