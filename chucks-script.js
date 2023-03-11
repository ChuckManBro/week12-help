'use strict';
// Margrith's Week-12

// jQuery test
// $('#create-new-student').click(doTheThing);
// function doTheThing() {
// 	console.log('The #create-new-student button was clicked!');
// }

const apiUrl = 'https://6409213d6ecd4f9e18a92d71.mockapi.io/api/Students';

class Student {
	constructor(name, title, out, due) {
		this.fullName = name;
		this.bookTitle = title;
		this.bookCheckedOut = out;
		this.bookDueBack = due;
	}
}

// GET - Render Student List
function getAndRenderAll() {
	// jQuery to GET all data from api
	$.get(apiUrl, renderAll);

	// After data successfully retrieved, this function
	function renderAll(apiData) {
		console.log(`API GET successful`);

		// Clear prior table rendering
		$('#app-table').empty();

		// For-Of-Loop to render all students
		for (let student of apiData) {
			const outDate = convertDateFormat(student.bookCheckedOut);
			const dueDate = convertDateFormat(student.bookDueBack);

			$('#app-table').append(`<tr>
	<th scope="row">${student.studentNo}</th>
	<td>${student.fullName}</td>
	<td>${student.bookTitle}</td>
	<td>${outDate}</td>
	<td>${dueDate}</td>
	<td><button class="btn btn-danger" onclick="deleteStudent('${student.id}')">Delete</button></td>
</tr>`);
		}
	}
}

function convertDateFormat(ISODate) {
	// Convert Date format
	const convertDate = new Date(ISODate);
	const newMonth = convertDate.getMonth() + 1;
	const newDayOfMonth = convertDate.getDate();
	const newYear = convertDate.getFullYear();
	return `${newMonth}/${newDayOfMonth}/${newYear}`;
}

// DELETE - Delete Student
function deleteStudent(id) {
	$.ajax({
		url: `${apiUrl}/${id}`,
		type: 'DELETE',
	}).then(() => {
		console.log(`API DELETE student ${id} successful`);
		getAndRenderAll();
	});
}

// POST - Add Student
function addStudent() {
	const name = $('#student-name').val();
	const title = $('#book-title').val();
	const out = $('#date-checked-out').val();
	const due = $('#date-book-due').val();

	// Construct a new student object
	const newStudent = new Student(name, title, out, due);

	// console.log(newStudent.fullName);
	// console.log(newStudent.bookTitle);
	// console.log(newStudent.bookCheckedOut);
	// console.log(newStudent.bookDueBack);
	// console.log(newStudent);

	// jQuery POST
	$.post(apiUrl, newStudent).then((data) => {
		console.log(`API POST of ${data.fullName} successful`);
		getAndRenderAll();
	});
}

//TODO - PUT - Edit Student Info

getAndRenderAll();
