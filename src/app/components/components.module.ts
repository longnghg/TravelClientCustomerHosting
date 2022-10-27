import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule }  from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { SidebarModule } from '@coreui/angular';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    NgbModule,
    FormsModule,
    SidebarModule

  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ProfileComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
  ]
})
export class ComponentsModule { }
