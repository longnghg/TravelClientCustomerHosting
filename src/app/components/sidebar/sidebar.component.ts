import { Component, OnInit } from '@angular/core';
import { INavData } from "@coreui/angular";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarItem: INavData[] = [
    {
      name: "Thông tin cá nhân"
    },
    {
      name: "Đăng xuất"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
