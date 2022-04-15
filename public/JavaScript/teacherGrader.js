function saveGrade() {
    document.getElementById('graderForm').style.display = 'block';
    var select = document.getElementById('student-name');
    var student = select.options[select.selectedIndex];
    document.getElementById('studentId').value = student.value
    document.getElementById('studentName').value = student.text;
}

function setGrade() {
    var mark = document.getElementById('studentMark');
    var grade = document.getElementById('studentGrade');
    var markValue = mark.value;
    if (markValue >= 0 && markValue <= 49){
        grade.value = "F";
    }
    else if (markValue >= 50 && markValue <=54){
        grade.value = "D";
    }
    else if (markValue >= 55 && markValue <= 59){
        grade.value = "D+";
    }
    else if (markValue >= 60 && markValue <= 64){
        grade.value = "C";
    }
    else if (markValue >= 65 && markValue <= 69){
        grade.value = "C+";
    }
    else if (markValue >= 70 && markValue <= 74){
        grade.value = "B";
    }
    else if (markValue >= 75 && markValue <= 79){
        grade.value = "B+";
    }
    else if (markValue >= 80 && markValue <= 89){
        grade.value = "A";
    }
    else if (markValue >= 90 && markValue <= 100){
        grade.value = "A+"
    }
    else
    {
        grade.value = null;
        alert("Invalid mark");
        mark.value = null;
    }
}