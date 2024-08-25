function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
}

module.exports = errorHandler;
function errorHandler(err, req, res, next) {
    // Default error message
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);

    res.json({
        message: err.message,
        // Show stack trace only in development environment
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}

module.exports = errorHandler;
