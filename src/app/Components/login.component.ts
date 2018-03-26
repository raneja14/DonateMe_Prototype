import { Donor } from './../Model/donor.model';
import { WelcomeService } from './../Service/welcome.service';
import { Constants } from './../Common/constants';
import { AuthenticationService } from './../Service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DonorService } from './../Service/donor.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: '../Html/login.component.html',
    styleUrls: ['../Css/login.component.css']
})
export class LoginComponent implements OnInit {
    bloodGroups: string[];
    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private welcomeService: WelcomeService,
        private authService: AuthenticationService) {}

    ngOnInit() {
        this.bloodGroups = Constants.bloodGroups;
        this.createLoginForm();
    }

    createLoginForm() {
        this.loginForm = this.formBuilder.group({
            'f_mobile': ['9999999992', Validators.required],
            'f_bloodGroup': 'B +ve'
        });
    }

    onLoginSubmit() {
        this.authService.authenticateDonor(this.prepareDonorObject());
    }

    prepareDonorObject() {
        const donorItem = new Donor();
        donorItem.bloodGroup = this.loginForm.value['f_bloodGroup'];
        donorItem.contact = this.loginForm.value['f_mobile'];
        return donorItem;
    }

    routeToHome() {
        this.welcomeService.routeToHome();
    }
}
