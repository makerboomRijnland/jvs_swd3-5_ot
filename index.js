class Student {
    constructor(data) {
        this.initials = data.initials;
        this.lastName = data.lastName;
        this.name = `${this.initials} ${this.lastName}`;
        this.group = data.group;
        this.dateOfBirth = new Date(data.dateOfBirth);
        this.email =
            `${this.initials}${this.lastName}@mborijnland.nl`.toLowerCase();
        this.avatar = `https://i.pravatar.cc/100?u=${this.email}`;

        const ageMs = Date.now() - this.dateOfBirth.getTime();
        const ageDate = new Date(ageMs); 
        this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    html() {
        const studentsSection = document.getElementById("students");
        const studentTemplate = document.getElementById("student-template");
        const studentArticle = studentTemplate.content
            .cloneNode(true)
            .querySelector(".student");

        studentArticle.querySelector(".avatar").src = this.avatar;
        studentArticle.querySelector(".name").innerHTML = this.name;
        studentArticle.querySelector(".age").innerHTML = `${this.age} jaar`;
        studentArticle.querySelector(".group").innerHTML = this.group;

        this.element = studentArticle;

        studentsSection.appendChild(studentArticle);
    }

    show() {
        this.element.style.display = "block";
    }

    hide() {
        this.element.style.display = "none";
    }
}

class StudentList {
    constructor() {
        this.students = [];

        fetch("students.json")
            .then((response) => response.json())
            .then((data) => this.parse(data));

        const groupFilterSelect = document.getElementById(
            "students-filter-group"
        );
        groupFilterSelect.addEventListener("change", () => this.filter());

        const ageFilterSelect = document.getElementById("students-filter-age");
        ageFilterSelect.addEventListener("change", () => this.filter());
    }

    parse(students) {
        this.students = students.map((data) => new Student(data));

        for (const student of this.students) {
            student.html();
        }
    }

    filter() {
        const groupFilterSelect = document.getElementById(
            "students-filter-group"
        );
        const groupFilter = groupFilterSelect.value;

        const ageFilterSelect = document.getElementById("students-filter-age");
        const ageFilter = ageFilterSelect.value;

        for (const student of this.students) {
            const isCorrectGroup = groupFilter == "--" || student.group == groupFilter;
            const isCorrectAge = ageFilter == "--" || student.age == ageFilter;

            if (isCorrectAge && isCorrectGroup) {
                student.show();
            } else {
                student.hide();
            }
        }
        // alert("Filter: " + groupFilterSelect.value);
    }
}

// function loadStudents() {

//     // const ageFilterSelect = document.getElementById('students-filter-age');
//     // const groupFilterSelect = document.getElementById('students-filter-group');

//     // ageFilterSelect.addEventListener('change', filterStudents);
//     // groupFilterSelect.addEventListener('change', filterStudents);
// }

// function filterStudents() {
//     const studentsSection  = document.getElementById('students');
//     const studentArticles = studentsSection.querySelectorAll('.student');

//     const ageFilterSelect = document.getElementById('students-filter-age');
//     const ageFilter = ageFilterSelect.value;

//     const groupFilterSelect = document.getElementById('students-filter-group');
//     const groupFilter = groupFilterSelect.value;

//     for(let studentArticle of studentArticles) {
//         const studentAge = studentArticle.querySelector('.age').innerHTML;
//         const studentGroup = studentArticle.querySelector('.group').innerHTML;

//         const isCorrectAge = ageFilter == "--" || studentAge == ageFilter;
//         const isCorrectGroup = groupFilter == "--" || studentGroup == groupFilter;

//         if(isCorrectAge && isCorrectGroup) {
//             studentArticle.style.display = 'block';
//         } else {
//             studentArticle.style.display = 'none';
//         }
//     }
// }

const studentList = new StudentList();
