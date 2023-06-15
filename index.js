

function showStudent(student) {
    const studentsSection  = document.getElementById('students');
    const studentTemplate = document.getElementById('student-template');
    const studentArticle = studentTemplate.content.cloneNode(true);

    const name = `${student.firstName} ${student.lastName}`;
    studentArticle.querySelector('.name').innerHTML = name;
    studentArticle.querySelector('.age').innerHTML = student.age;
    studentArticle.querySelector('.group').innerHTML = student.group;

    const avatarURL = `https://i.pravatar.cc/150?u=${student.lastName}`;
    studentArticle.querySelector('.avatar').src = avatarURL;

    studentsSection.appendChild(studentArticle);
}

function loadStudents() {
    fetch('students.json')
        .then((response) => response.json())
        .then((data) => showStudents(data));

        const groupFilterSelect = document.getElementById('students-filter-group');
        groupFilterSelect.addEventListener('change', filterStudents);

    // const ageFilterSelect = document.getElementById('students-filter-age');
    // const groupFilterSelect = document.getElementById('students-filter-group');

    // ageFilterSelect.addEventListener('change', filterStudents);
    // groupFilterSelect.addEventListener('change', filterStudents);
}

function filterStudents() {
    const groupFilterSelect = document.getElementById('students-filter-group');
    const groupFilter = groupFilterSelect.value;

    // alert("Filter: " + groupFilter);

    const studentsSection  = document.getElementById('students');
    const studentArticles = studentsSection.querySelectorAll('.student');

    // const ageFilterSelect = document.getElementById('students-filter-age');
    // const ageFilter = ageFilterSelect.value;

    // const groupFilterSelect = document.getElementById('students-filter-group');
    // const groupFilter = groupFilterSelect.value;

    for(let studentArticle of studentArticles) {
        const studentGroup = studentArticle.querySelector('.group').innerHTML;
        const groupFilterEmpty = groupFilter == "--";
        const isCorrectGroup = groupFilterEmpty || groupFilter == studentGroup;

        if(isCorrectGroup) {
            // Toon de student
            studentArticle.style.display = 'block';
        } else {
            // Verberg de student
            studentArticle.style.display = 'none';
        }
    }
}

function showStudents(students) {
    for(let student of students) {
        showStudent(student);
    }
}

const testStudent = {
    name: "B. Attyboy",
    age: 17,
    group: "LO2E-SWD3"
};

loadStudents();

// showStudent(testStudent);