

export const logErrors = (err, req, res, next) => {
    const statusCode = err && err.hasOwnProperty("statusCode") ? err.statusCode : 500;
    const message = err && err.hasOwnProperty("message") ? err.message : '';
    console.error(`error statusCode:  ${statusCode} message: ${message} `)
    return res.status(statusCode).json({ error: errMessageForClient(statusCode) });
}

function errMessageForClient(statusCode) {
    switch (statusCode) {
        case 400:
            return 'Invalid request parameters';
        case 401:
            return 'Authorization required';
        case 404:
            return 'Not found';
        case 500:
            return 'Internal Server Error';
        default:
            return 'Something went wrong!';
    }
}

