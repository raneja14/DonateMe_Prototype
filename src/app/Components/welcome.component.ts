import { HeaderComponent } from './header.component';
import { WelcomeService } from './../Service/welcome.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-welcome',
    templateUrl: '../Html/welcome.component.html',
    // styleUrls: ['../Css/donorCard.component.css']
})
export class WelcomeComponent implements OnInit {

    constructor(private welcomeService: WelcomeService) {}

    ngOnInit() {
     }

}
