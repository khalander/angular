import { Component, OnInit} from '@angular/core';
import  { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { GreetService } from './../employee.service'

@Component({
  selector: 'app-department',
  template: `
    <div>
    {{messageChild}}
      department works! 
      <div (click)="onSelect(department)" [class.selected]="isSelected(department)" *ngFor="let department of departmentList"> 
        {{department.id}} ) {{department.name}}
      </div>
  
    </div>
  `,
  styles: [
  ]
})
export class DepartmentComponent implements OnInit {

  public selecedId;
  public messageChild;

  public departmentList = [
    {id:1, name: 'PHP'},
    {id:2, name: 'Laravel'},
    {id:3, name: 'zend'}
  ]

  constructor(private router: Router, private route: ActivatedRoute, private _employeeService: GreetService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selecedId  = parseInt(params.get('id'))
    });

    this._employeeService.teacherGreeted$.subscribe(message => {
      if (message === 'Good Morning') {
        alert('Good Morning Teacher!');
      } else if (message === 'Well Done') {
        alert('Thank you Teacher!');
      }
    })
  }

  onSelect(department) {
    // this.router.navigate(['/departments', department.id])
    this.router.navigate([department.id], {relativeTo: this.route})
  }

  isSelected(department) {
    return this.selecedId === department.id
  }

  greetMufeez() {
    alert('Hello mufeez')
  }

}
