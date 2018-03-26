import { DonorService } from './../Service/donor.service';
import { Donor } from './../Model/donor.model';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-donor-list',
    templateUrl: '../Html/donorList.component.html',
    styleUrls: ['../Css/donorList.component.css']
})
export class DonorListComponent implements OnInit, OnDestroy {

    donors: Donor[];
    donorsSubscription: Subscription;

    constructor(private donorService: DonorService) {}

    ngOnInit() {
        this.donorsSubscription = this.donorService.donorsChanged
        .subscribe(
            (donorColl: Donor[]) => {
                this.donors = donorColl;
            }
        );
    }

    ngOnDestroy() {
        this.donorsSubscription.unsubscribe();
  //      alert('donor list destroyed');
    }
}
