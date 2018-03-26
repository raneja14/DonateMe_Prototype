import { Subscription } from 'rxjs/Subscription';
import { State } from './../Model/state.model';
import { City } from './../Model/city.model';
import { WelcomeService } from './../Service/welcome.service';
import { Donor } from './../Model/donor.model';
import { AuthenticationService } from './../Service/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../Common/constants';

@Component({
    selector: 'app-edit-donor',
    templateUrl: '../Html/donorProfile.component.html',
    styleUrls: ['../Css/donorProfile.component.css']
})
export class DonorProfileComponent implements OnInit, OnDestroy {

    donor: Donor;
    states: State[];
    cities: City[];
    initialCities: City[];
    bloodGroups: string[];
    stateSubscription: Subscription;
    citySubscription: Subscription;
    donorSubscription: Subscription;
    updateForm: FormGroup;
    allowUpdate = false;
    donorLoaded = false;

    constructor(private authService: AuthenticationService, private welcomeService: WelcomeService,
        private route: ActivatedRoute, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.states = this.welcomeService.getStates();
        this.donor = this.authService.getDonor();
        this.bloodGroups = Constants.bloodGroups;
        this.initiateSubscriptions();

        if (this.donor === null) {  // via routeParams
            this.authService.authenticateDonorById(this.getDonorIdViaRoute());
        } else {
            this.donorLoaded = true;
            this.welcomeService.loadCitiesByState(this.donor.stateId);
        }
        this.createUpdateForm();

    }

    initiateSubscriptions() {
        this.donorSubscription = this.authService.donorChanged
            .subscribe(
                (donorItem: Donor) => {
                    this.donor = donorItem;
                    this.welcomeService.loadCitiesByState(this.donor.stateId);
                }
            );
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
                    if (this.initialCities === undefined || this.initialCities === null) {
                        this.initialCities = cities;
                    }
                    if (this.donorLoaded === false) {
                        this.donorLoaded = true;
                        this.resetForm();
                    }
                }
            );
    }

    getDonorIdViaRoute() {
        return this.route.snapshot.params['donorId'];
    }

    ngOnDestroy() {
        this.donorSubscription.unsubscribe();
        this.stateSubscription.unsubscribe();
        this.citySubscription.unsubscribe();
    }

    createUpdateForm() {
        this.updateForm = this.formBuilder.group({
            'f_bloodGroup': this.donor === null ? null : this.donor.bloodGroup,
            'f_name': [this.donor === null ? null : this.donor.donorName, Validators.required],
            'f_mobile': [this.donor === null ? null : this.donor.contact, Validators.required],
            'f_email': [this.donor === null ? null : this.donor.email, Validators.required],
            'f_state': [this.donor === null ? null : this.donor.stateId, Validators.required],
            'f_city_pincode_group': this.formBuilder.group({
                'f_pincode': [this.donor === null ? null : this.donor.pincode, Validators.required],
                'f_city': [this.donor === null ? null : this.donor.cityId, Validators.required],
            })
        });

        this.updateForm.disable();
    }

    resetForm() {
        this.cities = this.initialCities;
        this.updateForm.setValue({
            'f_bloodGroup': this.donor.bloodGroup,
            'f_name': this.donor.donorName,
            'f_mobile': this.donor.contact,
            'f_email': this.donor.email,
            'f_state': this.donor.stateId,
            'f_city_pincode_group': {
                'f_pincode': this.donor.pincode,
                'f_city': this.donor.cityId
            }
        });
    }

    onStateSelected(stateId: number) {
        if (stateId > -1) {
            this.welcomeService.loadCitiesByState(stateId);
            this.updateForm.get('f_city_pincode_group.f_city').enable();
        } else {
            this.updateForm.get('f_city_pincode_group.f_city').disable();
        }
        this.updateForm.get('f_city_pincode_group.f_city').setValue(-1);
    }

    onFormReset() {
        this.resetForm();
        this.onEditClick();
    }

    onEditClick() {
        this.allowUpdate = !this.allowUpdate;
        if (this.allowUpdate) {
            this.updateForm.enable();
        } else {
            this.updateForm.disable();
        }
    }

    onUpdateSubmit() {

    }
}
