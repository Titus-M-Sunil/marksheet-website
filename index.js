let registerNumber = 241160038 // received from login page
let semesterName = "" // sheetID
let examName = "" // sheetName

const semEnterBtn = document.getElementById("sem-enter-btn")
const tableEl = document.getElementById("table-el")
const studentDetails = document.getElementById("student-details")



let sheetIDObject = {
  sem1 : "1WLP72ra6D-7XtBNG7lM6HUF31xn-l9ceShyXT1fCU6M",
  sem2 : "1zBgZc9f7oKVj57RO1pLr_A7xrMqbD7gJ",
  sem3 : "",
  sem4 : "",
  sem5 : "",
  sem6 : "",
  sem7 : "",
  sem8 : ""
}

semEnterBtn.addEventListener("click", (event) => {

  semesterName = sheetIDObject[`sem${document.querySelector('input[name="semester-number"]:checked').value}`]
  examName = document.querySelector('input[name="exam-name"]:checked').value

  const sheetDataHandler = (sheetData) => {
    console.log(sheetData)

    studentDetails.innerHTML = ""
    tableEl.innerHTML = ""

    // Headings ['RegisterNo', 'Math', 'Physics', 'Chemistry']
    let keysArray = Object.keys(sheetData['0']) 
    console.log(keysArray)

    let tempVariable = ""
    let index = 0
    for (let i=0; i<Object.keys(sheetData).length; i++) {
      if (registerNumber === sheetData[i]['Register Number ']) {
        console.log("success")
        index = i
      } else {
        console.log("failed")
      }
    }
    //-------------------------------------------
    //  Creating table elements from the objects
    //-------------------------------------------
   
    const titleArray = ['Subject', 'Marks']

    tempVariable += `
    <tr id="subject-head">
        <th>${titleArray[0]}</th>
        <th>${titleArray[1]}</th>
    </tr>
    `
    tableEl.innerHTML += tempVariable
    tempVariable = ""

    for (let i=3; i<keysArray.length-1; i++) {
      tempVariable += `
        <tr class="subject-rows">
          <td>${keysArray[i]}</td>
          <td>${sheetData[index][keysArray[i]]}</td>
        </tr>
      `
    }
    tableEl.innerHTML += tempVariable
    tempVariable = ""

    tempVariable += `
      <p>Register Number: ${registerNumber}</p>
      <p>Name of Student: ${sheetData[index][keysArray[2]]}</p>
    `
    studentDetails.innerHTML += tempVariable
    tempVariable = ""
  }

  getSheetData({
    sheetID: `${semesterName}`,
    sheetName: `${examName}`,
    query: "",
    callback: sheetDataHandler,
  })
})
