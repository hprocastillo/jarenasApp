import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogisticComponent} from "./components/logistic/logistic.component";
import {AuthGuard} from "../../core/guards/auth.guard";
import {ChecklistComponent} from "./components/checklist/checklist.component";
import {RoutesComponent} from "./components/routes/routes.component";
import {VehicleComponent} from "./components/vehicle/vehicle.component";
import {EditTripComponent} from "./components/routes/edit-trip/edit-trip.component";
import {NewTripComponent} from "./components/routes/new-trip/new-trip.component";
import {ViewRouteComponent} from "./components/routes/view-route/view-route.component";
import {
  ViewChecklistCurrentComponent
} from "./components/checklist/view-checklist-current/view-checklist-current.component";
import {ExportChecklistComponent} from "./components/checklist/export-checklist/export-checklist.component";
import {ViewTripComponent} from "./components/routes/view-trip/view-trip.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: 'logistic', component: LogisticComponent},

      //CHECKLIST
      {path: 'checklist/:userId/:userEmail', component: ChecklistComponent},
      {path: 'checklist/view/:id/:userId/:userEmail/:employeeId', component: ViewChecklistCurrentComponent},
      {path: 'checklist/export/:userId/:employeeId/:verificationId/:checklistId', component: ExportChecklistComponent},

      //ROUTES
      {path: 'routes/:userId/:userEmail', component: RoutesComponent},
      {path: 'route/view/:id/:userId/:userEmail/:employeeId', component: ViewRouteComponent},

      //TRIPS
      {path: 'trip/edit/:id/:userId/:userEmail/:employeeId', component: EditTripComponent},
      {path: 'trip/view/:id/:userId/:userEmail/:employeeId', component: ViewTripComponent},
      {path: 'trip/new/:userId/:userEmail/:employeeId', component: NewTripComponent},

      {path: 'vehicles/:userId/:userEmail', component: VehicleComponent},
      {path: '**', redirectTo: 'logistic'}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticsRoutingModule {
}
