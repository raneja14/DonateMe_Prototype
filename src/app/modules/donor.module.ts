import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DonorItemComponent } from './../Components/donorItem.component';
import { DonorListComponent } from './../Components/donorList.component';
import { DonorCardComponent } from './../Components/donorCard.component';
import { DonorProfileComponent } from './../Components/donorProfile.component';
import { SearchDonorsComponent } from './../Components/searchDonors.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        DonorListComponent,
        DonorItemComponent,
        DonorCardComponent,
        DonorProfileComponent,
        SearchDonorsComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class DonorModule {

}
