const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.code === 11000) {
    return res.status(400).json({ message: "SKU must be unique" });
  }

  res.status(500).json({ message: err.message || "Server Error" });
};

export default errorHandler;
