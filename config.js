const PORT = process.env.PORT || 8000;

const DBCONFIG = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "Student",
};

module.exports = { PORT, DBCONFIG };
