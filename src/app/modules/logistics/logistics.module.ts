import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LogisticsRoutingModule} from './logistics-routing.module';
import {LogisticComponent} from './components/logistic/logistic.component';
import {ChecklistComponent} from './components/checklist/checklist.component';
import {VehicleComponent} from './components/vehicle/vehicle.component';
import {RoutesComponent} from './components/routes/routes.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {BrandByIdComponent} from './components/vehicle/brand-by-id/brand-by-id.component';
import {NgbButtonsModule, NgbDatepickerModule, NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {ListRoutesComponent} from './components/routes/list-routes/list-routes.component';
import {ListTripsComponent} from './components/routes/list-trips/list-trips.component';
import {NewTripComponent} from './components/routes/new-trip/new-trip.component';
import {EditTripComponent} from './components/routes/edit-trip/edit-trip.component';
import {ViewRouteComponent} from './components/routes/view-route/view-route.component';
import {RouteByIdComponent} from './components/routes/route-by-id/route-by-id.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CityByIdComponent} from './components/city-by-id/city-by-id.component';
import {
  ListChecklistCurrentComponent
} from './components/checklist/list-checklist-current/list-checklist-current.component';
import {
  ListChecklistHistoricalComponent
} from './components/checklist/list-checklist-historical/list-checklist-historical.component';
import {
  ItemChecklistCurrentComponent
} from './components/checklist/item-checklist-current/item-checklist-current.component';
import {
  ViewChecklistCurrentComponent
} from './components/checklist/view-checklist-current/view-checklist-current.component';
import {ListQuestionsComponent} from './components/checklist/list-questions/list-questions.component';
import {AnswerComponent} from './components/checklist/answer/answer.component';
import {ExportChecklistComponent} from './components/checklist/export-checklist/export-checklist.component';
import {
  ExportQuestionsComponent
} from './components/checklist/export-checklist/export-questions/export-questions.component';
import {ExportAnswerComponent} from './components/checklist/export-checklist/export-answer/export-answer.component';
import {ViewTripComponent} from './components/routes/view-trip/view-trip.component';
import {VehicleByIdComponent} from './components/vehicle/vehicle-by-id/vehicle-by-id.component';
import {ChecklistByIdComponent} from './components/checklist/checklist-by-id/checklist-by-id.component';


@NgModule({
  declarations: [
    LogisticComponent,
    ChecklistComponent,
    VehicleComponent,
    RoutesComponent,
    ToolbarComponent,
    BrandByIdComponent,
    ListRoutesComponent,
    ListTripsComponent,
    NewTripComponent,
    EditTripComponent,
    ViewRouteComponent,
    RouteByIdComponent,
    CityByIdComponent,
    ListChecklistCurrentComponent,
    ListChecklistHistoricalComponent,
    ItemChecklistCurrentComponent,
    ViewChecklistCurrentComponent,
    ListQuestionsComponent,
    AnswerComponent,
    ExportChecklistComponent,
    ExportQuestionsComponent,
    ExportAnswerComponent,
    ViewTripComponent,
    VehicleByIdComponent,
    ChecklistByIdComponent
  ],
  imports: [
    CommonModule,
    LogisticsRoutingModule,
    NgbNavModule,
    FormsModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    NgbButtonsModule
  ]
})
export class LogisticsModule {
}
