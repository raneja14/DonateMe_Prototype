import { DonorService } from './../Service/donor.service';
import { Subscription } from 'rxjs/Subscription';
import { Donor } from './../Model/donor.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-search-donor',
    templateUrl: '../Html/searchDonors.component.html',
})
export class SearchDonorsComponent implements OnInit, OnDestroy {

    requestedDonor: Donor;
    requestedDonorSubscription: Subscription;

    constructor(private donorService: DonorService) { }

    ngOnInit() {
          this.initateSubscriptions();
    }

    ngOnDestroy() {
        this.requestedDonorSubscription.unsubscribe();
   //     alert('search destroyed');
    }

    initateSubscriptions() {
        this.requestedDonorSubscription =  this.donorService.donorRequested
        .subscribe(
            (donor: Donor) => {
                this.requestedDonor = donor;
            }
        );
    }

}
