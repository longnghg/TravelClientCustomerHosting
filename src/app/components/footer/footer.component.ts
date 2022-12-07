import { Component, OnInit } from '@angular/core';
import { ConfigService } from "../../services_API/config.service";

// signalr
import { HubConnection } from '@microsoft/signalr';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public configService:ConfigService) { }

  ngOnInit(): void {
   
  }

}
