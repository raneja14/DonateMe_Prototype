import { AlertService } from './alert.service';
import { WelcomeService } from './welcome.service';
import { Subject } from 'rxjs/Subject';
import { RestService } from './rest.service';
import { Donor } from './../Model/donor.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

    donor: Donor = null;
    donorChanged = new Subject<Donor>();

    constructor(private restService: RestService, private welcomeService: WelcomeService, private alertService: AlertService) { }

    setDonor(donorItem: Donor) {
        this.donor = donorItem;
        this.donorChanged.next(donorItem);
    }

    getDonor() {
        return this.donor;
    }


    authenticateDonor(donorItem: Donor) {
        this.restService.authenticateDonor(donorItem)
            .subscribe(
                (response: Donor) => {
                    if (response === null) {
                        alert('invalid credentials');
                    } else {
                        this.setDonor(response);
                        this.welcomeService.loadCitiesByState(response.stateId);
                      //  this.alertService.success('Login successful', true);
                        this.welcomeService.routeToHome();
                    }
                },
                (error: Error) => {
                    alert('Unable to process request !!');
                }
            );
    }

    authenticateUrlRequest(donor: Donor) {
        // if (donor === undefined || donor === null) {
        //     this.welcomeService.routeToWelcomePage();
        // }
    }

    authenticateDonorById(donorId: string) {
        this.restService.authenticateDonorById(donorId)
        .subscribe(
            (response: Donor) => {
                if (response === null) {
                    alert('invalid credentials');
                    this.welcomeService.routeToWelcomePage();
                } else {
                    this.setDonor(response);
                 }
            },
            (error: Error) => {
                alert('Unable to process request !!');
            }
        );
    }

}
