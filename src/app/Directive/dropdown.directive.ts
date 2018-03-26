import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropDownDirective {

    @HostBinding('class.show') isDropdownOpen = false;

    @HostListener('click') openDropdown() {
        this.isDropdownOpen = ! this.isDropdownOpen;
    }
}
