import { WelcomeService } from './Service/welcome.service';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private welcomeService: WelcomeService) { }

  ngOnInit() {
    this.welcomeService.loadAllStates();
  }

}

