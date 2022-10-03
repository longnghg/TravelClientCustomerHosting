import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule }  from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    NgbModule,
    FormsModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
  ]
})
export class ComponentsModule { }
