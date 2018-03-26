import { Subject } from 'rxjs/Subject';
import { Donor } from './../Model/donor.model';
import { CriteriaDto } from './../Dto/criteriaDto.DTO';
import { Injectable, EventEmitter } from '@angular/core';
import { RestService } from './rest.service';

@Injectable()
export class DonorService {

    private donors: Donor[];
    donorsChanged = new Subject<Donor[]>();
    donorRequested = new EventEmitter<Donor>();

    constructor(private restService: RestService) {}

    setDonors(donorColl: Donor[]) {
        this.donors = donorColl;
        this.donorsChanged.next(donorColl);
    }

    filterDonorsOnCriteria(criteria: CriteriaDto) {
        this.restService.searchDonors(criteria)
        .subscribe(
            (response: Donor[]) => {
                this.setDonors(response);
            }
        );
    }
}
