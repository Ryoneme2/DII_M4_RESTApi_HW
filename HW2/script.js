const singleStudentResult = document.getElementById("sinigle_student_result");
const listStudentResult = document.getElementById("output");
const addUserDetail = document.getElementById("addUserDetail");

const searchBtn = document.getElementById("inputGroup-sizing-default");

function addStudentData(student) {
  console.log(student);
  let idElem = document.getElementById("id");
  idElem.innerHTML = student.id;
  let studentIdElem = document.getElementById("studentId");
  studentIdElem.innerHTML = student.studentId;
  let nameElem = document.getElementById("name");
  nameElem.innerHTML = `${student.name} ${student.surname}`;
  let gpaElem = document.getElementById("gpa");
  gpaElem.innerHTML = student.gpa;
  let profileElem = document.getElementById("image");
  profileElem.setAttribute("src", student.image);
}

function onLoad() {
}

searchBtn.addEventListener('click', () => {
  const id = document.getElementById("search").value;
  showSingleInfo(id)
})

const showSingleInfo = (id) => {
  document.getElementById("sinigle_student_result").style.display = "block";
  fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // addStdToTableImg(index, data);
      addStudentData(data);
    })
    .catch((err) => {
      console.error(err);
    });
};