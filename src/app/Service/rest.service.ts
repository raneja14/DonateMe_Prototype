import { CriteriaDto } from './../Dto/criteriaDto.DTO';
import { Donor } from './../Model/donor.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { City } from '../Model/city.model';

@Injectable()
export class RestService {

    constructor(private http: Http) { }

    getAllStates() {
        return this.http.get('https://donateme-8f729.firebaseio.com/stateColl.json')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );

    }

    getCitiesByState(stateId: number) {
        // alert('STATE ID= ' + stateId);
        const cities: City[] = [];

        return this.http.get('https://donateme-8f729.firebaseio.com/cityColl.json')
            .map(
                (response: Response) => {
                    const data: City[] = response.json();
                    for (const city of data) {
                        if (city.stateId === 17) {
                            cities.push(city);
                        }
                    }
                    return cities;
                }
            );
    }

    registerDonor(donorItem: Donor) {
        return this.http.post('https://donateme-8f729.firebaseio.com/donorColl.json', donorItem);
    }

    getAllDonors() {
        return this.http.get('https://donateme-8f729.firebaseio.com/donorColl.json');
    }

    authenticateDonor(donorItem: Donor) {
        return this.getAllDonors()
            .map(
                (response: Response) => {
                    const donors: Donor[] = response.json();
                    console.log(donors.length);
                    for (const donor of donors) {
                        if (donorItem.bloodGroup === donor.bloodGroup) {
                            if (donorItem.contact === donor.contact) {
                                return donor;
                            }
                        }
                    }
                    return null;
                }
            );
    }

    authenticateDonorById(donorId: string) {
        return this.getAllDonors()
            .map(
                (response: Response) => {
                    const donors: Donor[] = response.json();
                    console.log(donors.length);
                    for (const donor of donors) {
                        if (donorId === donor.donorId) {
                            return donor;
                        }
                    }
                    return null;
                }
            );
    }

    searchDonors(criteriaItem: CriteriaDto) {
        return this.getAllDonors()
            .map(
                (response: Response) => {
                    const filteredDonors: Donor[] = [];
                    const donors: Donor[] = response.json();
                    for (const donor of donors) {
                        if (criteriaItem.bloodGroup === donor.bloodGroup) {
                            if (criteriaItem.cityId === donor.cityId) {
                                filteredDonors.push(donor);
                            }
                        }
                    }
                    return filteredDonors;
                }
            );
    }
}
