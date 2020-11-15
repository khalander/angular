import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from './../employee.service'

@Component({
  selector: '[app-test]',
  template: `
    <div> My kid name: {{name}} </div>
    <p>2 + 2 = {{2 + 2}}</p>
    <p>Concatenate: {{"Welcome " + name}}</p>
    <p>Length: {{name.length}}</p>
    <p>Upper case: {{name.toUpperCase()}}</p>
    <p>Function call: {{greetUser()}} </p>
    <p>Function call: {{greetUser()}} </p>
    <p>Not allowed calling js function : alternate solution: {{locationUrl}} </p> 
    <hr>
    <p> ------------------------------ Video 6 ----------------------------------</p>
    <p>
      <input [id] = "textId" type='text' value='Mufeez' />
    </p>

    <p>
      this way of binding (interpolation) will not work
      <input disabled="{{false}}" id="{{textId}}" type='text' value='Rabia' />
    </p>
    <p>
      <input [disabled]="isDisabled" id="{{textId}}" type='text' value='Rabia' />
    </p>  
    
    <p>
      alterway of binding
      <input bind-id = "textId" value="Fathima" /> 
    </p>
    <hr>
    <p> ------------------------------ Video 7 ----------------------------------</p>

    <h2 class="text-success"> normal way: Mufeez </h2>
    <h2 [class] = "textClass"> class binding: Mufeez </h2>
    <h2 class="text-success" [class]="textClass"> both normal and class binding: Mufeez</h2>
    <h2 [class.text-success]="hasError">Based on condition: Mufeez</h2>
    <h2 [ngClass]="msgClasses">Multiple class : Mufeez </h2>

    <hr>
    <p> ------------------------------ Video 8 ----------------------------------</p>

    <h2 [style.color]="'orange'"> Hardcoded value: Style binding </h2>
    <h2 [style.color] = "styleValue" >Dynamic value: Style binding</h2>
    <h2 [style.color]="hasError ? 'red' : 'green'" >Conditional value: style binding</h2>
    <h2 [ngStyle]="titleStyle">Mutiple value: style binding</h2>

    <hr>
    <p> ------------------------------ Video 9 (event handling) ----------------------------------</p>

    <p>{{greeting}} </p>
    <button (click) = "onClick($event)" >Click </button>
    <button (click) = "greeting='Inline example'" >Inline example</button>

    <hr>
    <p> ------------------------------ Video 10 (Template reference) ----------------------------------</p>

    <input #myInput type="text" value='' />
    <button (click)="logMessage(myInput)">Log</button>

    <hr>
    <p> ------------------------------ Video 11 (Two way binding) ----------------------------------</p>

    <input type="text" [(ngModel)]="twoWayBinding"/>  
    <p> {{twoWayBinding}} </p>

    <hr>
    <p> ------------------------------ Video 12 (If directive) ----------------------------------</p>


    <div *ngIf="displayName; then thenBlock else elseBlock">
    </div>

    <ng-template #thenBlock>
      <h2> Codevolution </h2>
    </ng-template>

    <ng-template #elseBlock>
      <h2> Udemy </h2>
    </ng-template>

    <hr>
    <p> ------------------------------ Video 13 (Switch directive) ----------------------------------</p>

    <div [ngSwitch]="color">
      <div *ngSwitchCase = "'red'"> You picked red color </div>
      <div *ngSwitchCase = "'green'"> You picked Green color </div>
      <div *ngSwitchDefault> Pick again </div>
    </div>

    <hr>
    <p> ------------------------------ Video 14 (For directive) ------------</p>

    <div *ngFor="let color of colors; even as i" >
      <h2>{{i}} - {{color}} </h2>
    </div>


    <hr>
    <p> ------------------------------ Video 15 (Component integration) ------------</p>

    Data from parent component: {{ nameFromParent }}

    <button (click)="fireSend()">Send event</button>


    <hr>
    <p> ------------------------------ Video 16 (Pipes) ------------</p>
    <h2>Lowercase: {{name | lowercase}} </h2>
    <h2>uppercase: {{name | uppercase}} </h2>
    <h2>titlecase: {{'Welcomme to code evolution' | titlecase}}</h2>
    <h2>slice: {{name | slice:2:3}} </h2>
    <h2> Json: {{titleStyle | json}} </h2>
    <h2>Number: {{5.678 | number: '1.2-3'}}</h2>
    <h2>{{ .50 | percent}} </h2>
    <h2> {{0.25 | currency}}</h2>
    <h2> {{0.25 | currency:'GBP'}}</h2>
    <h2>{{date}}</h2>
    <h2>{{date | date:'short'}}</h2>


    <hr>
    <p> ------------------------------ Video 19 (Services) ------------</p>

    <h2> Data from employee service class </h2>

    <div *ngFor="let employee of employeeList">
      <p>{{employee.id}} =>{{employee.name}} </p>
    </div>



  `,
  styles: [`
   .text-success {
     color: green;
   }
   .text-danger {
     color: red;
   }
   .text-special {
     font-style: italic;
   }
  `]
})
export class TestComponent implements OnInit {

  public name = 'Mufeez'
  public locationUrl = window.location.href
  public textId = 'name'
  public isDisabled = false;
  public textClass = 'text-success' 
  public hasError = false
  public isSpecial =  true
  public styleValue = 'red'
  public greeting = ''
  public twoWayBinding = ''
  public displayName = false
  public color = "red"
  
  // @Input() public parentData;

  @Input('parentData') public nameFromParent;
  @Output() public childEvent = new EventEmitter();


  public msgClasses = {
    "text-success": !this.hasError,
    "text-danger" : this.hasError,
    "text-special" : this.isSpecial
  }

  public titleStyle = {
    color: "blue",
    fontStyle : "italic"
  }

  public  colors = [
    "red", "green", "white", "orange"
  ]

  public  date = new Date();

  public employeeList = [];
  public errorMsg ;

  constructor(private  _employeeService: EmployeeService) { }

  ngOnInit(): void {
    // this.employeeList = this._employeeService.getEmployeeList()
    this._employeeService.getEmployeeList()
          .subscribe(
            data => this.employeeList = data, 
            error => this.errorMsg = error
          )
  }


  greetUser() {
    return 'Good morning ' + this.name
  }

  onClick(event) {
    this.greeting = 'Welcome to Angular and its click event' + event.type
  }

  logMessage(myInput) {
    console.log(myInput.value)
  }

  fireSend () {
    this.childEvent.emit('Hey codevolution')
  }

}
