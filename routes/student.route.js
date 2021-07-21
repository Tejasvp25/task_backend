const {
  addStudent,
  getStudents,
  deleteStudentInfo,
} = require("../controllers/student.controller");

/**
 * Register Student Related API Routes
 * @author Tejasvp25  <tejasvp25@gmail.com>
 * @param {Express App Object} app
 * @Return null
 */
module.exports = (app) => {
  app.post("/api/student", addStudent);
  app.get("/api/student", getStudents);
  app.get("/api/student/:rollno", getStudents);
  app.delete("/api/student", deleteStudentInfo);
};
