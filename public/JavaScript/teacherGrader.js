function saveGrade() {
    document.getElementById('graderForm').style.display = 'block';
    var select = document.getElementById('student-name');
    var student = select.options[select.selectedIndex];
    document.getElementById('studentName').value = student.text;
}