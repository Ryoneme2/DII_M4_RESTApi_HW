const btnSubmit = document.getElementById("btn-submit");

const addUserDetail = document.getElementById("addUserDetail");

// AddStudent.addEventListener("click", () => {
//   singleStudentResult.style.display = "block";
// })

const hideAll = () => {
  addUserDetail.style.display = "none";
};

const addStudent = (student, prefix) => {
  const output = document.getElementById("output");
  let row = document.createElement("div");
  row.classList.add("row");
  let col = document.createElement("div");
  col.classList.add("col-1");
  col.classList.add("offset-1");
  col.innerHTML = prefix;
  let colVal = document.createElement("div");
  colVal.classList.add("col");
  colVal.innerHTML = student;
  row.appendChild(col);
  row.appendChild(colVal);
  output.appendChild(row);
};

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

const addStdToTable = (index, student) => {
  let tableBody = document.getElementById("tableBody");
  let row = document.createElement("tr");
  let cell = document.createElement("td");
  cell.setAttribute("scope", "row");
  cell.innerHTML = index;
  row.appendChild(cell);
  cell = document.createElement("td");
  cell.innerHTML = student.name;
  row.appendChild(cell);
  cell = document.createElement("td");
  cell.innerHTML = student.username;
  row.appendChild(cell);
  cell = document.createElement("td");
  cell.innerHTML = student.gender;
  row.appendChild(cell);
  tableBody.appendChild(row);
};

const addStdToTableImg = (index, student) => {
  let tableBody = document.getElementById("tableBody");
  let row = document.createElement("tr");
  let cell = document.createElement("td");
  let img = document.createElement("img");
  let btnCell = document.createElement("button");
  let btnCell2 = document.createElement("button");
  let btnCell3 = document.createElement("button");
  img.src = student.image;
  // img.setAttribute("width", "70px");
  img.setAttribute("height", "100px");
  cell.setAttribute("scope", "row");
  cell.innerHTML = index;
  row.appendChild(cell);
  cell = document.createElement("td");
  cell.innerHTML = student.name;
  row.appendChild(cell);
  cell = document.createElement("td");
  cell.appendChild(img);
  row.appendChild(cell);
  cell = document.createElement("td");
  cell.innerHTML = student.surname;
  row.appendChild(cell);
  cell = document.createElement("td");
  btnCell2.innerHTML = "show Info";
  btnCell2.setAttribute("id", "btn-info");
  btnCell2.setAttribute("onclick", `showSingleInfo(${student.id})`);
  btnCell2.classList.add("btn");
  btnCell2.classList.add("btn-primary");
  btnCell2.classList.add("text-white");
  cell.appendChild(btnCell2);
  row.appendChild(cell);
  cell = document.createElement("td");
  btnCell3.innerHTML = "edit";
  btnCell3.setAttribute("id", "btn-edit");
  btnCell3.setAttribute("onclick", `showEditData(${student.id})`);
  btnCell3.classList.add("btn");
  btnCell3.classList.add("text-white");
  btnCell3.classList.add("btn-info");
  cell.appendChild(btnCell3);
  row.appendChild(cell);
  cell = document.createElement("td");
  btnCell.innerHTML = "delete";
  btnCell.setAttribute("id", "btn-delete");
  btnCell.setAttribute("onclick", `detById(${student.id})`);
  btnCell.classList.add("btn");
  btnCell.classList.add("btn-danger");
  cell.appendChild(btnCell);
  row.appendChild(cell);
  tableBody.appendChild(row);
};

const showEditData = async (id) => {
  addUserDetail.style.display = "block";

  const idUser = document.getElementById("idUser");
  const nameInput = document.getElementById("nameInput");
  const surnameInput = document.getElementById("surnameInput");
  const studentIdInput = document.getElementById("stdIdInput");
  const gpaInput = document.getElementById("gpaInput");
  const imageInput = document.getElementById("imageInput");

  const singleUserData = await getSingleUserData(id);

  idUser.value = singleUserData.id;
  nameInput.value = singleUserData.name;
  surnameInput.value = singleUserData.surname;
  studentIdInput.value = singleUserData.studentId;
  gpaInput.value = singleUserData.gpa;
  imageInput.value = singleUserData.image;
};

const onSubmitEdit = async () => {
  const id = document.getElementById("idUser").value;
  const name = document.getElementById("nameInput").value;
  const surname = document.getElementById("surnameInput").value;
  const studentId = document.getElementById("stdIdInput").value;
  const gpa = document.getElementById("gpaInput").value;
  const image = document.getElementById("imageInput").value;

  const editUser = {
    id,
    name,
    surname,
    studentId,
    gpa,
    image,
  };

  const conf = confirm("Are you sure you want to edit this user?");
  if (conf) {
    await fetch(`https://dv-student-backend-2019.appspot.com/students`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editUser),
    });
    // console.log(data);
    showStdData();
    hideAll();
  }
  return;
};

const detById = (id) => {
  const conf = confirm("คุณต้องการลบข้อมูลนี้หรือไม่");
  if (conf) {
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Get std failed");
      })
      .then((data) => {
        onLoad();
      })
      .catch((e) => console.error(e));
  } else {
    return;
  }
};

const getSingleUserData = async (id) => {
  const response = await fetch(
    `https://dv-student-backend-2019.appspot.com/student/${id}`
  );
  const data = await response.json();
  return data;
};

const showStdData = () => {
  document.getElementById("tableBody").innerHTML = "";
  fetch("https://dv-student-backend-2019.appspot.com/students")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // addStdToTableImg(index, data);
      data.forEach((v, i) => {
        addStdToTableImg(i + 1, v);
      });
    });
};

function onLoad() {
  hideAll();
  showStdData();
}

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

btnSubmit.addEventListener("click", onSubmitEdit);
