import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor(router) {
        this.router = router;
        this.title = 'bookstore';
    }
    goPlaces() {
        this.router.navigate(['/', 'red-pill']).then(nav => {
            console.log(nav); // true if navigation is successful
        }, err => {
            console.log(err); // when there's an error
        });
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map