let registerNumber = 241160053 // received from login page
let semesterName = "" // sheetID
let examName = "" // sheetName

const semEnterBtn = document.getElementById("sem-enter-btn")
const subjectHead = document.getElementById("subject-head")
const subjectMark = document.getElementById("subject-mark")

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

    semesterName = sheetIDObject[`sem${document.querySelector('input[name="semester-number"]:checked').value}`]
    examName = document.querySelector('input[name="exam-name"]:checked').value

    subjectHead.innerHTML = ""
    subjectMark.innerHTML = ""

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
    for (let i=1; i<keysArray.length-1; i++) {
      tempVariable += `
        <th>${keysArray[i]}</th>
      `
      console.log("subject head=", keysArray[i])
    }
    subjectHead.innerHTML += tempVariable
    tempVariable = ""

    console.log("index=", index)
    for (let i=1; i<keysArray.length-1; i++) {
      tempVariable += `
      <td>${sheetData[index][keysArray[i]]}</td>
      `
      console.log("subject marks=", sheetData[index][keysArray[i]])
    }
    subjectMark.innerHTML += tempVariable
  }

  getSheetData({
    sheetID: `${semesterName}`,
    sheetName: `${examName}`,
    query: "",
    callback: sheetDataHandler,
  })
})
