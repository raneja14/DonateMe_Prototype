import { Subscription } from 'rxjs/Subscription';
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {

    private messageChanged = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        router.events
        .subscribe(
           (event) => {
                if (event instanceof NavigationStart) {
                    if (this.keepAfterNavigationChange) {
                        // only keep for a single location change
                        this.keepAfterNavigationChange = false;
                    } else {
                        // clear alert
                        this.messageChanged.next();
                    }
                }
           }
        );
    }

    success(message: string , keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.messageChanged.next({ type: 'success', text: message });
    }

    error(message: string , keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.messageChanged.next({ type: 'error', text: message });
    }

    getMessageChangedNotification() {
        return this.messageChanged.asObservable();
    }


}
