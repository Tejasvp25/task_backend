const { query } = require("../db");
const INSERT_STUDENT = "INSERT INTO student(name,rollno) VALUES(?,?)";
const SELECT_STUDENT_WITH_INTERVAL =
  "SELECT * FROM student where created_at > now() - INTERVAL ? day";
const SELECT_ALL_STUDENT = "SELECT * FROM student ORDER BY rollno";
const SELECT_STUDENT_WITH_ROLLNO =
  "SELECT * FROM student where rollno=? ORDER BY rollno";
const DELETE_STUDENT = "DELETE FROM student WHERE rollno=?";

/**
 * Handler function for {/api/student} route
 * @method POST
 * @author Tejasvp25  <tejasvp25@gmail.com>
 * @param {Object} req  Express Request object
 * @param {Object} res  Express Response object
 */
const addStudent = async (req, res) => {
  const { name, rollno } = req.body;
  if ([name, rollno].includes(undefined))
    return res.status(400).json({ message: "Name or Roll No. Not provided" })
      .end;

  try {
    await query(INSERT_STUDENT, [name, rollno]);
    return res.status(201).end();
  } catch (error) {
    console.log(error);
    if (error.errno === 1062) {
      return res
        .status(409)
        .json({ message: "Student with given Roll No. Already Exists" })
        .end();
    }
    return res.status(500).json(error).end();
  }
};

/**
 * Handler function for {/api/student} route
 * @method GET
 * @author Tejasvp25  <tejasvp25@gmail.com>
 * @param {Object} req  Express Request object
 * @param {Object} res  Express Response object
 */
// intervalType = [week,day]
// interval = quantity in numbers
const getStudents = async (req, res) => {
  const { intervalType } = req.query;
  const interval = Number(req.query.interval);
  const { rollno } = req.params;
  if (rollno) {
    try {
      const result = await query(SELECT_STUDENT_WITH_ROLLNO, [rollno]);
      if (result.length > 0) {
        return res.status(200).json(result[0]).end();
      }
      return res
        .status(404)
        .json({ message: "Student with given Roll No. Not Found" })
        .end();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Unexpected Error Occured" })
        .end();
    }
  }
  let intervalDays = 0;

  if (intervalType && intervalType.toLowerCase() === "week") {
    intervalDays = interval * 7;
  } else {
    intervalDays = interval || 0;
  }
  try {
    const result =
      intervalDays === 0
        ? await query(SELECT_ALL_STUDENT, [])
        : await query(SELECT_STUDENT_WITH_INTERVAL, [intervalDays]);
    return res.status(200).json(result).end();
  } catch (error) {
    if (error.errno === 1062) {
      return res
        .status(409)
        .json({ message: "Student with given Roll No. Already Exists" })
        .end();
    }
    return res.status(500).json(error).end();
  }
};

/**
 * Handler function for {/api/student} route
 * @method DELETE
 * @author Tejasvp25  <tejasvp25@gmail.com>
 * @param {Object} req  Express Request object
 * @param {Object} res  Express Response object
 */
const deleteStudentInfo = async (req, res) => {
  const { rollno } = req.body;
  if (rollno === undefined) return res.status(400).end();
  try {
    await query(DELETE_STUDENT, [rollno]);
    return res.status(200).end();
  } catch (error) {
    return res.status(500).end();
  }
};

module.exports = { addStudent, getStudents, deleteStudentInfo };
