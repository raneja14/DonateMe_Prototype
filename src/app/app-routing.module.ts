import { SearchDonorsComponent } from './Components/searchDonors.component';
import { DonorProfileComponent } from './Components/donorProfile.component';
import { DonorListComponent } from './Components/donorList.component';
import { WelcomeComponent } from './Components/welcome.component';
import { HomeComponent } from './Components/home.component';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './Components/login.component';
import { LogoutComponent } from './Components/logout.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'login', redirectTo: '/welcome' },
    { path: 'logout', component: LogoutComponent },
    { path: 'register', redirectTo: '/welcome' },
    { path: 'home' , component: HomeComponent, children: [
        { path: '', component: SearchDonorsComponent },
        { path: 'search', component: SearchDonorsComponent },
        { path: 'profile', component: DonorProfileComponent },
        { path: 'profile/:donorId', component: DonorProfileComponent },
    ] },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
