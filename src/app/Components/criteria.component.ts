import { DonorService } from './../Service/donor.service';
import { City } from './../Model/city.model';
import { WelcomeService } from './../Service/welcome.service';
import { State } from './../Model/state.model';
import { AuthenticationService } from './../Service/authentication.service';
import { Subscription } from 'rxjs/Subscription';
import { Donor } from './../Model/donor.model';
import { Constants } from '../Common/constants';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CriteriaDto } from '../Dto/criteriaDto.DTO';

@Component({
    selector: 'app-criteria',
    templateUrl: '../Html/criteria.component.html',
    styleUrls: ['../Css/criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnDestroy {
    bloodGroups: string[];
    criteriaForm: FormGroup;
    authDonor: Donor = null;
    states: State[];
    cities: City[];
    stateSubscription: Subscription;
    citySubscription: Subscription;

    constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
        private welcomeService: WelcomeService, private donorService: DonorService) { }

    ngOnInit() {
        this.bloodGroups = Constants.bloodGroups;
        this.authDonor = this.authService.getDonor();
        this.states = this.welcomeService.getStates();
        this.cities = this.welcomeService.getCities();
        this.stateSubscription = this.welcomeService.statesChanged
            .subscribe(
                (states: State[]) => {
                    this.states = states;
                }
            );
        this.citySubscription = this.welcomeService.citiesChanged
            .subscribe(
                (cities: City[]) => {
                    this.cities = cities;
                }
            );
        this.createCriteriaForm();
    }

    createCriteriaForm() {
        this.criteriaForm = this.formBuilder.group({
            'f_bloodGroup': 'A +ve',
            'f_state': this.authDonor === null ? -1 : this.authDonor.stateId,
            'f_city': this.authDonor === null ? -1 : this.authDonor.cityId
        });
    }

    onStateSelected(stateId: number) {
        if (stateId > -1) {
            this.welcomeService.loadCitiesByState(stateId);
            this.criteriaForm.get('f_city').enable();
        } else {
            this.criteriaForm.get('f_city').disable();
        }
        this.criteriaForm.get('f_city').setValue(-1);
    }

    onCriteriaSubmit() {
        this.donorService.filterDonorsOnCriteria(this.prepareCriteriaObj());
        this.donorService.donorRequested.emit(undefined);
    }

    prepareCriteriaObj() {
        const criteria = new CriteriaDto();
        criteria.bloodGroup = this.criteriaForm.get('f_bloodGroup').value;
        criteria.stateId = this.criteriaForm.get('f_state').value;
        criteria.cityId = this.criteriaForm.get('f_city').value;
        return criteria;

    }

    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
        this.citySubscription.unsubscribe();
  //      alert('criteria destroyed');
    }
}
