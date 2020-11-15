import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { DepartmentDetailsComponent  } from './department-details/department-details.component';
import  { EmployeeComponent } from './employee/employee.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DepartmentDashboardComponent} from './department-dashboard/department-dashboard.component';
import { DepartmentOverviewComponent } from './department-overview/department-overview.component'
 
const routes: Routes = [
  {path: '', redirectTo: '/departments', pathMatch: 'full'},
  {path: 'departments', component: DepartmentComponent},
  {
    path: 'departments/:id', 
    component: DepartmentDetailsComponent,
    children: [
      {path: 'overview', component:DepartmentOverviewComponent},
      {path: 'dashboard', component: DepartmentDashboardComponent}
    ]
  },
  {path: 'employees', component: EmployeeComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export  const routingComponents = [
  DepartmentComponent,
  EmployeeComponent,
  PageNotFoundComponent,
  DepartmentDetailsComponent
]
