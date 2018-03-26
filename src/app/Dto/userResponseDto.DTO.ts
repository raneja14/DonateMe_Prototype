import { City } from './../Model/city.model';
import { Donor } from './../Model/donor.model';
import { State } from '../Model/state.model';
import { Country } from '../Model/country.model';

export class UserResponseDto {
    public donor: Donor;
    public city: City;
    public state: State;
}
