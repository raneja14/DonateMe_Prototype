import { WelcomeService } from './../Service/welcome.service';
import { AuthenticationService } from './../Service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-logout',
    template: ''
})
export class LogoutComponent implements OnInit{

    constructor(private authService: AuthenticationService,private welcomeService: WelcomeService) {}

    ngOnInit() {
        this.authService.setDonor(null);
        this.welcomeService.loadAllStates();
        this.welcomeService.routeToWelcomePage();
    }

}