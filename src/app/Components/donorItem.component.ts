import { DonorService } from './../Service/donor.service';
import { Donor } from './../Model/donor.model';
import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'app-donor-item',
    templateUrl: '../Html/donorItem.component.html',
    styleUrls: ['../Css/donorItem.component.css']
})
export class DonorItemComponent implements OnInit {
    @Input() donor: Donor;

    constructor(private donorService: DonorService) {}

    ngOnInit() {
    }

    onDonorRequest() {
        this.donorService.donorRequested.emit(this.donor);
    }
}
