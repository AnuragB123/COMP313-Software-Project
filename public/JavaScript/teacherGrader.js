var down = document.getElementById('studentGradesForm')

//Breakline element
var br = document.createElement('br');

function addStudentGrades() {
    //Get the username of the student teacher selected
    let usernameDiv = document.getElementById("student-name");
    let usernameText = usernameDiv.options[usernameDiv.selectedIndex];

    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("id", "studentGradesForm");
    form.setAttribute("action", "/grader/addGrade");

    var userName = document.createElement("input");
    userName.setAttribute("type", "text");
    userName.setAttribute("name", "username");
    userName.setAttribute("readonly", "readonly");
    userName.setAttribute("value", usernameText);

    // Create an input element for courseName
    var CN = document.createElement("input");
    CN.setAttribute("type", "text");
    CN.setAttribute("name", "courseName");
    CN.setAttribute("placeholder", "Course Name:");
    CN.setAttribute("required", true);

    // Create an input element for grade
    var GM = document.createElement("input");
    GM.setAttribute("type", "text");
    GM.setAttribute("name", "courseName");
    GM.setAttribute("placeholder", "Course Name:");
    GM.setAttribute("required", true);
}