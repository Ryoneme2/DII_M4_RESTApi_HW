const btn = document.getElementById("btn");
const btnSubmit = document.getElementById("btn-submit");
var index = 1;

const singleStudentResult = document.getElementById("sinigle_student_result");
const listStudentResult = document.getElementById("output");
const addUserDetail = document.getElementById("addUserDetail");
const AllStudentMenu = document.getElementById("AllStudentMenu");
const AddMenu = document.getElementById("AddMenu");
const AddStudent = document.getElementById("AddStudent");

AllStudentMenu.addEventListener("click", () => {
  hideAll()
  listStudentResult.style.display = "block";
  showStdData();
});
AddMenu.addEventListener("click", () => {
  hideAll()
  addUserDetail.style.display = "block";
});
// AddStudent.addEventListener("click", () => {
//   singleStudentResult.style.display = "block";
// })

const hideAll = () => {
  singleStudentResult.style.display = "none";
  listStudentResult.style.display = "none";
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
  btnCell2.classList.add("btn-info");
  btnCell2.classList.add("text-white");
  cell.appendChild(btnCell2);
  row.appendChild(cell);
  cell = document.createElement("td");
  btnCell = document.createElement("button")
  btnCell.innerHTML = "edit";
  btnCell.setAttribute("id", "btn-edit");
  btnCell.setAttribute("onclick", `detById(${student.id})`);
  btnCell.classList.add("btn");
  btnCell.classList.add("btn-danger");
  cell.appendChild(btnCell);
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

const addStdToDb = (student) => {
  fetch("https://dv-student-backend-2019.appspot.com/students", {
    method: "POST",
    body: JSON.stringify(student),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Add std failed");
    })
    .then((data) => {
      console.log(data);
      addStudentData(data);
    })
    .catch((e) => console.error(e));
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

const delTheerakarn = async (student) => {
  const res = await fetch(
    "https://dv-student-backend-2019.appspot.com/students"
  );
  const userData = await res.json();

  const idTheerakarn = userData
    .filter((v) => v !== null)
    .map((v, i) => {
      console.log(v);
      if (v.studentId === "642110319") {
        return v.id;
      }
    })
    .filter((v) => v !== undefined);

  console.log({ idTheerakarn });

  idTheerakarn.forEach(async (v) => {
    // console.log(v);
    const response = await fetch(
      `https://dv-student-backend-2019.appspot.com/student/${v}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.status === 200) {
      throw new Error("Delete failed");
    }
    const data = await response.json();
    console.log(data);
  });
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

btn.addEventListener("click", () => {
  const input = document.getElementById("input-text").value;

  fetch(`https://dv-student-backend-2019.appspot.com/student/${input}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // addStdToTableImg(index, data);
      addStudentData(data);
      index++;
    })
    .catch((err) => {
      console.error(err);
    });
});

btnSubmit.addEventListener("click", () => {
  const dataStd = {
    studentId: document.getElementById("stdIdInput").value,
    name: document.getElementById("nameInput").value,
    surname: document.getElementById("surnameInput").value,
    gpa: parseInt(document.getElementById("gpaInput").value),
    image: document.getElementById("imageInput").value,
  };

  addStdToDb(dataStd);
});
