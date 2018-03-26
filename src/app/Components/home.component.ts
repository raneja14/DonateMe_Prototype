import { WelcomeService } from './../Service/welcome.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Donor } from './../Model/donor.model';
import { DonorService } from './../Service/donor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: '../Html/home.component.html',
    styleUrls: ['../Css/home.component.css']
})
export class HomeComponent{
}
