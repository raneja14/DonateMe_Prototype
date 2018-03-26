import { Donor } from './../Model/donor.model';
import { WelcomeService } from './../Service/welcome.service';
import { City } from './../Model/city.model';
import { Country } from './../Model/country.model';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Constants } from './../Common/constants';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { State } from '../Model/state.model';
import { Subscription } from 'rxjs/Subscription';
import { UUID } from 'angular2-uuid';

@Component({
    selector: 'app-signup',
    templateUrl: '../Html/signUp.component.html',
    styleUrls: ['../Css/signUp.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
    states: State[];
    cities: City[];
    bloodGroups: string[];
    signUpForm: FormGroup;
    private stateSubscription: Subscription;
    private citySubscription: Subscription;

    constructor(private welcomeService: WelcomeService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.bloodGroups = Constants.bloodGroups;
        this.initiateSubscriptions();
        this.createSignUpForm();
    }

    initiateSubscriptions() {
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
    }

    createSignUpForm() {

        this.signUpForm = this.formBuilder.group({
            'f_bloodGroup': 'A +ve',
            'f_name': [null, Validators.required],
            'f_mobile': [null, Validators.required],
            'f_email': [null, Validators.required],
            'f_state': [-1, Validators.required],
            'f_city_pincode_group': this.formBuilder.group({
                'f_pincode': [null, Validators.required],
                'f_city': [{ value: -1, disabled: true }, Validators.required],
            })
        });
    }

    onStateSelected(stateId: number) {
         if (stateId > -1) {
            this.welcomeService.loadCitiesByState(stateId);
            this.signUpForm.get('f_city_pincode_group.f_city').enable();
        } else {
            this.signUpForm.get('f_city_pincode_group.f_city').disable();
        }
        this.signUpForm.get('f_city_pincode_group.f_city').setValue(-1);
    }

    onSignUpSubmit() {
        //    this.welcomeService.registerDonor(this.prepareDonorObject());
        this.signUpForm.reset();
    }

    prepareDonorObject() {
        const donor = new Donor();
        donor.donorId = UUID.UUID();
        donor.bloodGroup = this.signUpForm.get('f_bloodGroup').value;
        donor.donorName = this.signUpForm.get('f_name').value;
        donor.contact = this.signUpForm.get('f_mobile').value;
        donor.email = this.signUpForm.get('f_email').value;
        donor.stateId = this.signUpForm.get('f_state').value;
        donor.cityId = this.signUpForm.get('f_city_pincode_group.f_city').value;
        donor.pincode = this.signUpForm.get('f_city_pincode_group.f_pincode').value;

        return donor;
    }


    routeToHome() {
        this.welcomeService.routeToHome();
    }

    ngOnDestroy(): void {
        this.stateSubscription.unsubscribe();
        this.citySubscription.unsubscribe();
      //   alert('sigup component destroyed');
    }
}
