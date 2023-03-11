class Student {
	constructor(name, number, title) {
		this.name = name;
		this.number = number;
		this.title = title;
		this.nameArray = [];
		this.numberArray = [];
		this.titleArray = [];
	}
}

class StudentService {
	static url = 'https://6409213d6ecd4f9e18a92d71.mockapi.io/api/Students';

	static async getAllStudents() {
		const res = await fetch(this.url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' },
		});
		if (res.ok) {
			return res.json();
		}
	}

	static getStudent(id) {
		return $.get(this.url + `/${id}`);
	}

	static async createStudent(student) {
		const res = fetch(this.url, student, {
			method: 'PUT',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ completed: true }),
		});
		if (res.ok) {
			return res.json();
		}
	}

	static updateStudent(student) {
		return $.ajax({
			url: this.url + `/${student._id}`,
			datatype: 'json',
			data: JSON.stringify(student),
			contentType: 'application/json',
			type: 'PUT',
		});
	}

	static deleteStudent(id) {
		return $.ajax({
			url: this.url + `/${id}`,
			type: 'DELETE',
		});
	}
}

class DOMmanager {
	static students;

	static getAllStudents() {
		StudentService.getAllStudents().then((students) => this.render(students));
	}

	static deleteStudent(id) {
		StudentService.deleteStudent(id)
			.then(() => {
				return StudentService.getAllStudents();
			})
			.then((students) => this.render(students));
	}

	static createHouse(name, number, title) {
		StudentService.createStudent(new Student(name, number, title))
			.then(() => {
				return StudentService.getAllStudents();
			})
			.then((students) => this.render(students));
	}

	static render(students) {
		this.students = students;
		$('#app-table').empty();
		for (let student of students) {
			$('#app-table').append(
				`<tr>
                    <th scope="row">${student.studentNo}</th>
                    <td>${student.fullName}</td>
                    <td>${student.bookTitle}</td>
                    <td>${student.bookCheckedOut}</td>
                    <td>${student.bookDueBack}</td>
                    <td><button class="btn btn-danger" onclick="DOMmanager.deleteStudent('${student.id}')">Delete Student</button></td>
                 </tr>`
			);
		}
	}
}

// DOMmanager.getAllStudents();

// Chuck's Additions

// const buttonAddStudent = $('#create-new-student');
// console.log(buttonAddStudent);
// buttonAddStudent.click(() => console.log('Add Button was clicked!'));

// OR
$('#create-new-student').click(doTheThing);

function doTheThing() {
	console.log('Bloop Bloop Bleep The #create-new-student button was clicked!');
}
