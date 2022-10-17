import { Routes } from '@angular/router';

import { HomeComponent } from '../../pages/home/home.component';
import { AboutComponent } from '../../pages/about/about.component';
import { ContactComponent } from '../../pages/contact/contact.component';
import { ElementsComponent } from '../../pages/elements/elements.component';
import { ServicesComponent } from '../../pages/services/services.component';
import { InforComponent } from '../../pages/infor/infor.component';
import { TourDetailComponent } from '../../pages/tour-detail/tour-detail.component';
export const ClientLayoutRoutes: Routes = [
    { path: 'home',              component: HomeComponent },
    { path: 'about',             component: AboutComponent },
    { path: 'contact',           component: ContactComponent },
    { path: 'elements',          component: ElementsComponent },
    { path: 'services',          component: ServicesComponent },
    { path: 'infor',             component: InforComponent },
    { path: 'id',              component: TourDetailComponent },
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
  { path: '/id',       title: 'Tour Detail',  icon: '',     class: '' },
];
