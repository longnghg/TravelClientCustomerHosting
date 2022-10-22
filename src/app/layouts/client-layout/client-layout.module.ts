import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ClientLayoutRoutes } from './client-layout.routing';
import { HomeComponent } from '../../pages/home/home.component';
import { AboutComponent } from '../../pages/about/about.component';
import { ContactComponent } from '../../pages/contact/contact.component';
import { ElementsComponent } from '../../pages/elements/elements.component';
import { ServicesComponent } from '../../pages/services/services.component';
import { InforComponent } from '../../pages/infor/infor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxTypedJsModule} from 'ngx-typed-js';
// import { ToastrModule } from 'ngx-toastr';
import { TourBookingComponent } from '../../pages/tourBooking/tour-booking.component';
import { NavModule, TabsModule } from '@coreui/angular';
import { NgSelectModule }           from '@ng-select/ng-select';

import { BillComponent } from '../../pages/bill/bill.component';
import { BillsHistoryComponent } from '../../pages/bills-history/bills-history.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClientLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxTypedJsModule,
    NavModule,
    TabsModule,
    NgSelectModule
  ],
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ElementsComponent,
    ServicesComponent,
    InforComponent,
    TourBookingComponent,
    BillComponent,
    BillsHistoryComponent
  ]
})

export class ClientLayoutModule {}
