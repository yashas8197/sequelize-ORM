const { DataTypes, sequelize } = require("../lib/");
const { course } = require("./course.model");
const { student } = require("./student.model");

const studentCourse = sequelize.define("studentCourse", {
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: course,
      key: "id",
    },
  },
  studentId: {
    type: DataTypes.INTEGER,
    references: {
      model: student,
      key: "id",
    },
  },
});

course.belongsToMany(student, { through: studentCourse });
student.belongsToMany(course, { through: studentCourse });

export default studentCourse;
