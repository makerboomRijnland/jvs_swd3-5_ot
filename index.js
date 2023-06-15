class Student {
    constructor(data) {
        this.initials = data.initials;
        this.lastName = data.lastName;
        this.name = `${this.initials} ${this.lastName}`;
        this.group = data.group;
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
}

const student = new Student({
    initials: "A.",
    lastName: "Antonius",
    age: 15,
    group: "LO2E-SWD1"
});

student.html();
