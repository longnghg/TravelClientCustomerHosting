import { Routes } from '@angular/router';

import { HomeComponent } from '../../pages/home/home.component';
import { AboutComponent } from '../../pages/about/about.component';
import { ContactComponent } from '../../pages/contact/contact.component';
import { ElementsComponent } from '../../pages/elements/elements.component';
import { ServicesComponent } from '../../pages/services/services.component';
import { InforComponent } from '../../pages/infor/infor.component';
import { TourBookingComponent } from '../../pages/tours/tour-booking/tour-booking.component';
import { BillComponent } from '../../pages/bills/bill/bill.component';
import { BillsHistoryComponent } from '../../pages/bills/bills-history/bills-history.component';
import { TourDetailComponent } from '../../pages/tours/tour-detail/tour-detail.component';

export const ClientLayoutRoutes: Routes = [
    { path: 'home',                 component: HomeComponent },
    { path: 'about',                component: AboutComponent },
    { path: 'contact',              component: ContactComponent },
    { path: 'elements',             component: ElementsComponent },
    { path: 'services',             component: ServicesComponent },
    { path: 'infor',                component: InforComponent },
    { path: 'tour-booking/:id1/:id2',     component: TourBookingComponent },
    { path: 'tour-detail/:id1/:id2',     component: TourDetailComponent },
    { path: 'bill/:id',             component: BillComponent },
    { path: 'bills-history',         component: BillsHistoryComponent },
];


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/home',      title: 'Home',      icon: '',     class: '' },
  { path: '/about',     title: 'About',     icon: '',     class: '' },
  { path: '/contact',   title: 'Contact',   icon: '',     class: '' },
  { path: '/elements',  title: 'Elements',  icon: '',     class: '' },
  { path: '/services',  title: 'Services',  icon: '',     class: '' },
];
