import { AlertService } from './Service/alert.service';
import { AlertComponent } from './Directive/alert.component';
import { LogoutComponent } from './Components/logout.component';
import { DropDownDirective } from './Directive/dropdown.directive';
import {HttpModule} from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './Components/welcome.component';
import { LoginComponent } from './Components/login.component';
import { SignUpComponent } from './Components/signUp.component';
import { DonorCardComponent } from './Components/donorCard.component';
import { DonorItemComponent } from './Components/donorItem.component';
import { DonorListComponent } from './Components/donorList.component';
import { CriteriaComponent } from './Components/criteria.component';
import { DonorProfileComponent } from './Components/donorProfile.component';
import { HeaderComponent } from './Components/header.component';
import { HomeComponent } from './Components/home.component';

import { AuthenticationService } from './Service/authentication.service';
import { DonorService } from './Service/donor.service';
import { RestService } from './Service/rest.service';
import { WelcomeService } from './Service/welcome.service';
import { SearchDonorsComponent } from './Components/searchDonors.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    HeaderComponent,
    CriteriaComponent,
    DonorListComponent,
    DonorItemComponent,
    DonorCardComponent,
    DonorProfileComponent,
    SearchDonorsComponent,
    LogoutComponent,
    DropDownDirective,
    AlertComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule
    ],
  providers: [
    RestService,
    WelcomeService,
    AuthenticationService,
    DonorService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
