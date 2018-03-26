import { AuthenticationService } from './../Service/authentication.service';
import { Donor } from './../Model/donor.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-header',
    templateUrl: '../Html/header.component.html',
    styleUrls: ['../Css/header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    authDonor: Donor;
    private donorSubscription: Subscription;
    showDropdown = false;

    constructor(private authService: AuthenticationService) { }

    ngOnInit() {
        this.donorSubscription = this.authService.donorChanged
            .subscribe(
                (donor: Donor) => {
                    this.authDonor = donor;
                }
            );
        this.authService.authenticateUrlRequest(this.authDonor);
    }

    ngOnDestroy() {
        this.donorSubscription.unsubscribe();
        alert('header components destroyed');
    }

    caretClicked() {
        this.showDropdown = !this.showDropdown;
    }
}
