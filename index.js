const loadBtn = document.getElementById("load-btn")
const inputEl = document.getElementById("reg-number-input")
const semesterInput = document.getElementById("semester-input")
let semesterNumber = ""
let semesterName = ""

inputEl.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault()
    semesterNumber = parseInt(semesterInput.value)
    console.log("semester number=", semesterNumber)

    for (i=1; i<9; i++) {
      if (i === semesterNumber) {
        semesterName = "Semester" + i
      }
    }
    
    console.log("semester name=", semesterName)
    loadBtn.click()
  }
})  

loadBtn.addEventListener("click", (event) => {
  const sheetDataHandler = (sheetData) => {
    //ADD YOUR CODE TO WORK WITH sheetData ARRAY OF OBJECTS HERE    
    const registerNumber = parseFloat(document.getElementById("reg-number-input").value)
    const subjectHead = document.getElementById("subject-head")
    const subjectMark = document.getElementById("subject-mark")
    subjectHead.innerHTML = ""
    subjectMark.innerHTML = ""

    console.log("sheet data: ", sheetData);
    console.log("Register number = ", sheetData[0]['RegisterNo'])
    console.log("Length = ", Object.keys(sheetData).length)

    const keysArray = Object.keys(sheetData['0']) // ['RegisterNo', 'Math', 'Physics', 'Chemistry']
    console.log(keysArray)
    
    let tempVariable = ""
    let index = 0
    for (let i=0; i<Object.keys(sheetData).length; i++) {
      if (registerNumber === sheetData[i]['RegisterNo']) {
        console.log("success")
        index = i
      } else {
        console.log("failed")
      }
    }
    //-------------------------------------------
    //  Creating table elements from the objects
    //-------------------------------------------
    for (let i=1; i<keysArray.length; i++) {
      tempVariable += `
        <th>${keysArray[i]}</th>
      `
      console.log("subject head=", keysArray[i])
    }
    subjectHead.innerHTML += tempVariable
    tempVariable = ""

    console.log("index=", index)
    for (let i=1; i<keysArray.length; i++) {
      tempVariable += `
      <td>${sheetData[index][keysArray[i]]}</td>
      `
      console.log("subject marks=", sheetData[index][keysArray[i]])
    }
    subjectMark.innerHTML += tempVariable
  };

  // --==== QUERY EXAMPLES ====--
  // --==== USE LETTERS FOR COLUMN NAMES ====--
  //  'SELECT A,C,D WHERE D > 150'
  //  'SELECT * WHERE B = "Potato"'
  //  'SELECT * WHERE A contains "Jo"'
  //  'SELECT * WHERE C = "active" AND B contains "Jo"'
  //  "SELECT * WHERE E > date '2022-07-9' ORDER BY E DESC"

  getSheetData({
    // sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
    sheetID: "1WLP72ra6D-7XtBNG7lM6HUF31xn-l9ceShyXT1fCU6M",
    // sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
    sheetName: `${semesterName}`,
    query: "",
    callback: sheetDataHandler,
  });
});

