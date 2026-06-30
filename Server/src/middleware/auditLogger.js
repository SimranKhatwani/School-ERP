const auditLogger = (action) => {
  return (req, res, next) => {
    console.log({
      action,
      user: req.user?._id || "Anonymous",
      ip: req.ip,
      method: req.method,
      route: req.originalUrl,
      timestamp: new Date(),
    });

    next();
  };
};

export default auditLogger;
