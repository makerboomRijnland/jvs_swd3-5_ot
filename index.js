
class Student {
    constructor(data) {
        this.initials = data.initials;
        this.lastName = data.lastName;
        this.name = `${this.initials} ${this.lastName}`;
        this.group = data.group;
        this.email = `${this.initials}${this.lastName}@mborijnland.nl`.toLowerCase();
        this.avatar = `https://i.pravatar.cc/100?u=${this.email}`;
    }

    html() {
        const studentsSection  = document.getElementById('students');
        const studentTemplate = document.getElementById('student-template');
        const studentArticle = studentTemplate.content.cloneNode(true);

        studentArticle.querySelector('.avatar').src = this.avatar;
        studentArticle.querySelector('.name').innerHTML = this.name;
        studentArticle.querySelector('.age').innerHTML = this.age;
        studentArticle.querySelector('.group').innerHTML = this.group;

        studentsSection.appendChild(studentArticle);
    }
}

class StudentList {
    constructor() {
        this.students = [];

        fetch('students.json')
            .then((response) => response.json())
            .then((data) => this.parse(data));
    }

    parse(students) {
        this.students = students.map((data) => new Student(data));
        
        for(const student of this.students) {
            student.html();
        }
    }
}

function loadStudents() {

    // const ageFilterSelect = document.getElementById('students-filter-age');
    // const groupFilterSelect = document.getElementById('students-filter-group');

    // ageFilterSelect.addEventListener('change', filterStudents);
    // groupFilterSelect.addEventListener('change', filterStudents);
}

function filterStudents() {
    const studentsSection  = document.getElementById('students');
    const studentArticles = studentsSection.querySelectorAll('.student');

    const ageFilterSelect = document.getElementById('students-filter-age');
    const ageFilter = ageFilterSelect.value;

    const groupFilterSelect = document.getElementById('students-filter-group');
    const groupFilter = groupFilterSelect.value;

    for(let studentArticle of studentArticles) {
        const studentAge = studentArticle.querySelector('.age').innerHTML;
        const studentGroup = studentArticle.querySelector('.group').innerHTML;
        
        const isCorrectAge = ageFilter == "--" || studentAge == ageFilter;
        const isCorrectGroup = groupFilter == "--" || studentGroup == groupFilter;

        if(isCorrectAge && isCorrectGroup) {
            studentArticle.style.display = 'block';
        } else {
            studentArticle.style.display = 'none';
        }
    }
}

const studentList = new StudentList();