import { Routes } from '@angular/router';

import { HomeComponent } from '../../pages/home/home.component';
import { AboutComponent } from '../../pages/about/about.component';
import { ContactComponent } from '../../pages/contact/contact.component';
import { ElementsComponent } from '../../pages/elements/elements.component';
import { ServicesComponent } from '../../pages/services/services.component';
import { InforComponent } from '../../pages/infor/infor.component';
import { TourBookingComponent } from '../../pages/tours/tour-booking/tour-booking.component';
import { TourListComponent } from '../../pages/tours/tour-list/tour-list.component';
import { BillComponent } from '../../pages/bills//bill/bill.component';
import { BillsHistoryComponent } from '../../pages/bills/bills-history/bills-history.component';
import { ProfileComponent } from '../../pages/profile/profile.component';
import { TourDetailComponent } from '../../pages/tours/tour-detail/tour-detail.component';
import { VouchersHistoryComponent } from 'src/app/pages/voucher/vouchers-history/vouchers-history.component';
export const ClientLayoutRoutes: Routes = [
    { path: 'home',                 component: HomeComponent },
    { path: 'about',                component: AboutComponent },
    { path: 'voucher',              component: ContactComponent },
    { path: 'elements',             component: ElementsComponent },
    { path: 'services',             component: ServicesComponent },
    { path: 'infor',                component: InforComponent },
    { path: 'tour/:id',     component: TourListComponent },
    { path: 'tour-booking/:id1/:id2',     component: TourBookingComponent },
    { path: 'tour-detail/:id1/:id2',     component: TourDetailComponent },
    { path: 'bill/:id',             component: BillComponent },
    { path: 'bills-history',         component: BillsHistoryComponent },
    { path: 'profile/:id',         component: ProfileComponent },
    { path: 'vouchers-history',     component: VouchersHistoryComponent}
];


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/home',      title: 'Trang chủ',      icon: '',     class: '' },
  { path: '/about',     title: 'Tin tức',     icon: '',     class: '' },
  { path: '/voucher',   title: 'Voucher',   icon: '',     class: '' },
];
