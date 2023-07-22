export const SuccessResponse = (
    {
        res,
        statusCode = 200,
        message = "Success",
        payload = {}
    }) => {

    res.status(statusCode).json({

        message,
        "status_code": statusCode,
        "data": payload,
    })
}

export const ErrorResponse = ({res, statusCode = 500, message = 'Something went wrong'}) => {
    res.status(statusCode).json({
        message,
        "status_code": statusCode,
        "error": true,
    })
}