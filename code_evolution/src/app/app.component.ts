import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from './user'
import { EnrollmentService } from './enrollment.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { FormBuilder } from '@angular/forms';
import { ForbiddenNameValidator } from './shared/user-name.validator'
import { PasswordValidator } from './shared/password.validator'
import { DepartmentComponent } from './department/department.component'
import { GreetService } from './employee.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
  title = 'Mufeez';

  public name = "Mufeez -  from parent component"
  public message = ''
  public topicHasError = true
  errorMsg = ''
  submitted = false

  topics = ['Angular', 'React', 'Vue']

  userModel = new User('', 'mufeez@gmail.com', 5444443, 'default', 'morning', true)

  registrationForm: FormGroup;

  constructor(private _enrollmentService: EnrollmentService, private fb: FormBuilder, private _employeeService: GreetService) {}

  // registrationForm = new FormGroup({
  //   userName: new FormControl('Mufeez'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // })

  

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['Mufee', [Validators.required, Validators.minLength(3), ForbiddenNameValidator(/password/)]],
      password: [''],
      confirmPassword: [''],
      email: [''],
      subscribe: [false],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      })      
    }, {validator: PasswordValidator});

    this.registrationForm.get('subscribe').valueChanges
    .subscribe(checkedValue => {
      const email = this.registrationForm.get('email');
      if (checkedValue) {
        email.setValidators(Validators.required);
      } else {
        email.clearValidators();
      }
      email.updateValueAndValidity();
    });
    
  }
  // ----------------------------------------------------

    // @ViewChild('nameRef') nameElementRef: ElementRef;
    @ViewChild(DepartmentComponent) departmentComponentRef: DepartmentComponent

    // ngAfterViewInit() {
    //   // this.nameElementRef.nativeElement.focus();
    //   this.departmentComponentRef.messageChild = 'Message from parent component'
    // }

  // ----------------------------------------------------
  private _customerName: string;

  get customerName(): string {
    return this._customerName
  }

  set customerName(value: string) {
    this._customerName = value;
    if (value == 'mufeez') {
      alert('hello mufeez')
    }
  }

  greetMufeez(value) {
    if (value == 'mufeez') {
      alert('Welcome mufeez')
    }
  }
  // ----------------------------------------------------

    get email() {
      return this.registrationForm.get('email');
    }
    get userName() {
      return this.registrationForm.get('userName')
    }

  validateTopic(value) {
    if (value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  loadAPIData() {
    // this.registrationForm.setValue({
    //   userName: 'Bruce',
    //   password: 'test',
    //   confirmPassword: 'test',
    //   address: {
    //     city: 'City',
    //     state: 'State',
    //     postalCode: '123456'
    //   }
    // });

    this.registrationForm.patchValue({
      userName: 'Bruce',
      password: 'test',
      confirmPassword: 'test'
    });
  }

  onSubmit() {
    this.submitted = true;
    this._enrollmentService.enroll(this.userModel)
      .subscribe(
        response => console.log('Success!', response),
        error => this.errorMsg = error.statusText
      )
  }


  greetStudent() {
    this._employeeService.greet('Good Morning')
  }

  appreciateStudent() {
    this._employeeService.greet('Well Done')
  }

}
