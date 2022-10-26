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
import { TourBookingComponent } from '../../pages/tours/tour-booking/tour-booking.component';
import { NavModule, TabsModule } from '@coreui/angular';
import { NgSelectModule }           from '@ng-select/ng-select';

import { BillComponent } from '../../pages/bills/bill/bill.component';
import { BillsHistoryComponent } from '../../pages/bills/bills-history/bills-history.component';

import { TourDetailComponent } from '../../pages/tours/tour-detail/tour-detail.component';
import { TourListComponent } from '../../pages/tours/tour-list/tour-list.component';

import { ProfileComponent } from '../../pages/profile/profile.component';

import { PipesModule } from "../../pipes/pipes.module";
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
    NgSelectModule,
    PipesModule
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
    BillsHistoryComponent,
    ProfileComponent,
    TourDetailComponent,
    TourListComponent,

  ]
})

export class ClientLayoutModule {}
