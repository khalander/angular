import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap} from '@angular/router'

@Component({
  selector: 'app-department-details',
  template: `
    <div>
      department-details works! : {{selecedId}}
      <router-outlet></router-outlet>

      <p> 
        <button (click)="showOverview()">Overview</button>
        <button (click)="showDashboard()">Dashboard</button>
      </p>

      <a (click)="goNext()">Next</a> 
      <a (click)="goPrevious()">Previoush</a>   
    </div>
    <div>
      <a (click)="goBack()">Back</a>
    </div>
  `,
  styles: [
  ]
})
export class DepartmentDetailsComponent implements OnInit {

  public selecedId;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { 

  }

  ngOnInit(): void {
    // this.selecedId = parseInt(this.route.snapshot.paramMap.get('id'))

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selecedId  = parseInt(params.get('id'))
    });
  }

  goNext() {
    let id = this.selecedId + 1;
    this.router.navigate(['/departments', id]);
  }

  goPrevious() {
    let id =  this.selecedId - 1;
    this.router.navigate(['/departments', id])
  }


  goBack() {
    let selectedId = this.selecedId ? this.selecedId : null;
    // this.router.navigate(['/departments', {id: selectedId}]);
    this.router.navigate(['../', {id: selectedId}], {relativeTo: this.route})

  }

  showOverview() {
    this.router.navigate(['overview'], {relativeTo: this.route  })
  }

  showDashboard() {
    this.router.navigate(['dashboard'], {relativeTo: this.route  })
  }

}
