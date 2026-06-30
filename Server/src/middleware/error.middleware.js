const errorMiddleware = (err, req, res, next) => {
  // Handle invalid JSON
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON payload. Check that your request body is valid JSON.",
    });
  }

  console.error(err);

  res.status(err.statusCode || err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;
