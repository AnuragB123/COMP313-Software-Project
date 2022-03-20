var down = document.getElementById("profileForm");
           
// Create a break line element
var br = document.createElement("br");

function updateProfile() {

let usernameDiv = document.getElementById("username-para");
let usernameText = usernameDiv.innerText.split(":")[1].trim();
            
// Create a form dynamically
var form = document.createElement("form");
form.setAttribute("method", "post");
form.setAttribute("id", "profileForm");
form.setAttribute("action", "/user/updateProfile");

var usrname = document.createElement("input");
usrname.setAttribute("type", "text");
usrname.setAttribute("name", "username");
usrname.setAttribute("readonly", "readonly");
usrname.setAttribute("value", usernameText);

// Create an input element for emailID
var EID = document.createElement("input");
EID.setAttribute("type", "email");
EID.setAttribute("name", "email");
EID.setAttribute("placeholder", "E-Mail ID");
EID.setAttribute("required", true);

// Create an radio element for userType student
var radioboxStudent = document.createElement('input');
radioboxStudent.type = 'radio';
radioboxStudent.id = 'student-radio';
radioboxStudent.value = 'student';
radioboxStudent.name = 'userType';

// Create an radio element for userType teacher
var radioboxTeacher = document.createElement('input');
radioboxTeacher.type = 'radio';
radioboxTeacher.id = 'teacher-radio';
radioboxTeacher.value = 'teacher';
radioboxTeacher.name = 'userType';
radioboxStudent.checked = true;

document.querySelectorAll("input[name='userType']").forEach((input) => {
    input.addEventListener('change', handleRadioClick);
});

// Create a label for radio element student
var labelStudent = document.createElement('label')
labelStudent.htmlFor = 'student-radio';
var descriptionStudent = document.createTextNode('Student');
labelStudent.appendChild(descriptionStudent);

// Create a label for radio element teacher
var labelTeacher = document.createElement('label')
labelTeacher.htmlFor = 'teacher-radio';
var descriptionTeacher = document.createTextNode('Teacher');
labelTeacher.appendChild(descriptionTeacher);

// Create an radio element for userType isTutor
var radioboxTutor = document.createElement('input');
radioboxTutor.type = 'radio';
radioboxTutor.id = 'isTutor-radio';
radioboxTutor.value = 'yes';
radioboxTutor.name = 'isTutor';

// Create an radio element for userType notTutor
var radioboxNonTutor = document.createElement('input');
radioboxNonTutor.type = 'radio';
radioboxNonTutor.id = 'notTutor-radio';
radioboxNonTutor.value = 'no';
radioboxNonTutor.name = 'isTutor';

// Create a label for radio element student
var labelTutor = document.createElement('label')
labelTutor.htmlFor = 'isTutor-radio';
var descriptionTutor = document.createTextNode('Tutor?');
labelTutor.appendChild(descriptionTutor);

// Create a label for radio element teacher
var labelNonTutor = document.createElement('label')
labelNonTutor.htmlFor = 'notTutor-radio';
var descriptionNonTutor = document.createTextNode('Not Tutor?');
labelNonTutor.appendChild(descriptionNonTutor);

// Create an input element for phone number
var PhoneNo = document.createElement("input");
PhoneNo.setAttribute("type", "tel");
PhoneNo.setAttribute("pattern", "[0-9]{10}");
PhoneNo.setAttribute("name", "phone");
PhoneNo.setAttribute("placeholder", "Phone Number");
PhoneNo.setAttribute("required", true);

// Create a label for number format
var labelPhoneFormat = document.createElement('small');
var descriptionPhoneFormat = document.createTextNode('Format - 1234567890');
labelPhoneFormat.appendChild(descriptionPhoneFormat);

// create a submit button
var s = document.createElement("input");
s.setAttribute("type", "submit");
s.setAttribute("value", "Submit");
    

// Append the usrname to the form
form.appendChild(usrname);
form.appendChild(br.cloneNode());

// Append the emailID to the form
form.appendChild(EID);
form.appendChild(br.cloneNode());
    
// Append the Phone number to the form
form.appendChild(PhoneNo);
form.appendChild(br.cloneNode());
form.appendChild(labelPhoneFormat);
form.appendChild(br.cloneNode());

// Append radio buttons for user-type
form.appendChild(labelStudent);
form.appendChild(radioboxStudent);
form.appendChild(labelTeacher);
form.appendChild(radioboxTeacher);
form.appendChild(br.cloneNode());
    
// Append the submit button to the form
form.appendChild(s);

let oldDiv = document.getElementById("profilePage");
let updateBtn = document.getElementById("btnUpdateProfile");

//document.getElementsByTagName("body")[0].appendChild(form);
oldDiv.parentNode.replaceChild(form, oldDiv);
form.parentNode.removeChild(updateBtn);
}

function handleRadioClick(event) {
    // Append radio buttons for tutor-type
    form.appendChild(labelTutor);
    form.appendChild(radioboxTutor);
    form.appendChild(labelNonTutor);
    form.appendChild(radioboxNonTutor);
    form.appendChild(br.cloneNode());
}