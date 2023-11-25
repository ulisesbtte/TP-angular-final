import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { Student } from 'src/app/models/student'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private studentService: StudentsService, private modalService:NgbModal) { }

  studentList = new Array<Student>()

  email:string
  lastName:string
  id: number
  firstName: string
  dni: string
  cohort = 10
  status = 'aaa'
  phone = 'bbb'
  address = 'ccc'
  gender = 'ddd'

  id2: number
  dni2: string
  lastName2: string
  firstName2: string
  email2: string

  dni3: string
  lastName3: string
  firstName3: string
  email3: string


  ngOnInit() {
    this.get()
  }

  get() {
    this.studentService.get().subscribe(response => {
      this.studentList = response
      console.log(this.studentList)
    })
  }

  save() {
    var student = new Student()
    student.dni = this.dni
    student.lastName = this.lastName
    student.email = this.email
    student.firstName = this.firstName
    student.cohort = this.cohort
    student.address = this.address
    student.gender = this.gender
    student.status = this.status
    student.phone = this.phone

    this.studentService.save(student).subscribe(() => {
      location.reload()
    })
  }

  delete(id:number) {
    this.studentService.delete(id).subscribe(() => {
      location.reload()
    })
  }

  update(ver: any, s: Student) {
    this.id2 = s.id
    this.dni2 = s.dni
    this.lastName2 = s.lastName
    this.firstName2 = s.firstName
    this.email2 = s.email
    this.dni3 = s.dni
    this.lastName3 = s.lastName
    this.firstName3 = s.firstName
    this.email3 = s.email
    this.modalService.open(ver).result.then(() => {
      if (this.dni2.trim() !== '' && this.lastName2.trim() !== '' && this.firstName2.trim() !== '' && this.email2.trim() !== '' &&
        (this.dni2.trim() !== this.dni3.trim() || this.lastName2.trim() !== this.lastName3.trim() || this.firstName2.trim() !== this.firstName3.trim() || this.email2.trim() !== this.email3.trim())) {
        let student = new Student()
        student.id = this.id2
        student.dni = this.dni2
        student.lastName = this.lastName2
        student.firstName = this.firstName2
        student.email = this.email2
        student.cohort = 0
        student.status = 'activo'
        student.gender = 'masculino'
        student.address = 'abc123'
        student.phone = '000'
        this.studentService.update(student).subscribe(() => {
          location.reload()
        }, error => {
          console.error(error)
          alert('Error: ' + error.error.message)
        })
      }
    }, reason => { })
  }
}
