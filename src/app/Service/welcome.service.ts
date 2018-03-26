import { Donor } from './../Model/donor.model';
import { Router } from '@angular/router';
import { City } from './../Model/city.model';
import { RestService } from './rest.service';
import { Response } from '@angular/http';
import { State } from '../Model/state.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WelcomeService {

    states: State[] = null;
    cities: City[] = null;
    statesChanged = new Subject<State[]>();
    citiesChanged = new Subject<City[]>();

    constructor(private router: Router, private restService: RestService) { }

    setStates(stateColl: State[]) {
        this.states = stateColl;
        this.statesChanged.next(this.states);
    }

    getStates() {
        return this.states;
    }

    setCities(cityColl: City[]) {
        this.cities = cityColl;
        this.citiesChanged.next(this.cities);
    }

    getCities() {
        return this.cities;
    }

    loadAllStates() {
        this.restService.getAllStates()
            .subscribe(
                (response: State[]) => {
                    this.setStates(response);
                }
            );
    }

    loadCitiesByState(stateId: number) {
        this.restService.getCitiesByState(stateId)
            .subscribe(
                (response: City[]) => {
                    this.setCities(response);
                }
            );
    }

    registerDonor(donorItem: Donor) {
        this.restService.registerDonor(donorItem)
            .subscribe(
                (response: Response) => {
                    if (response.status === 200) {
                        alert('Saved Successfully !!');
                        this.routeToHome();
                    } else {
                        alert('Could not register donor !!');
                    }
                },
                (error: Error) => {
                    alert('OOPS !! something went wroing. Try again later...');
                }
            );

    }
    routeToHome() {
        this.router.navigate(['/home/search']);
    }

    routeToWelcomePage() {
        this.router.navigate(['/welcome']);
    }
}
