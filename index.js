class Student {
    constructor(data) {
        this.initials = data.initials;
        this.lastName = data.lastName;
        this.name = `${this.initials} ${this.lastName}`;
        this.group = data.group;
        this.age = data.age;
        this.email =
            `${this.initials}${this.lastName}@mborijnland.nl`.toLowerCase();
        this.avatar = `https://i.pravatar.cc/100?u=${this.email}`;
    }

    html() {
        const studentsSection = document.getElementById("students");
        const studentTemplate = document.getElementById("student-template");
        this.element = studentTemplate.content
            .cloneNode(true)
            .querySelector(".student");

        this.element.querySelector(".avatar").src = this.avatar;
        this.element.querySelector(".name").innerHTML = this.name;
        this.element.querySelector(".age").innerHTML = `${this.age} jaar`;
        this.element.querySelector(".group").innerHTML = this.group;

        studentsSection.appendChild(this.element);
    }

    show() {
        this.element.style.display = null;
    }

    hide() {
        this.element.style.display = "none";
    }
}

class StudentList {
    constructor() {
        // TODO: get students from JSON!
        this.students = [];

        fetch("students.json")
            .then((response) => response.json())
            .then((data) => this.parse(data));

        const groupFilterSelect = document.getElementById('students-filter-group');
        groupFilterSelect.addEventListener('change', () => this.filter());
    }

    parse(data) {
        for(let row of data) {
            const student = new Student(row);
            this.students.push(student);
            student.html();
        }
    }

    filter() {
        const groupFilterSelect = document.getElementById('students-filter-group');
        const groupFilter = groupFilterSelect.value;

        for(const student of this.students) {
            const isCorrectGroup = groupFilter == '--' || student.group == groupFilter;
            
            if(isCorrectGroup) {
                student.show();
            } else {
                student.hide();
            }
        }
        // alert('Filter ' + groupFilterSelect.value);
    }
}

const studentList = new StudentList();
