import { Donor } from './../Model/donor.model';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-donor-card',
    templateUrl: '../Html/donorCard.component.html',
    styleUrls: ['../Css/donorCard.component.css']
})
export class DonorCardComponent {
    @Input() requestedDonor: Donor;



}
