import { AlertService } from './../Service/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: '../Html/alert.component.html'
})

export class AlertComponent implements OnInit {
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessageChangedNotification().
            subscribe(message => { this.message = message; });
    }
}
