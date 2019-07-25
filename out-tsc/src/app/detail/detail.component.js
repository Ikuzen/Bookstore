import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let DetailComponent = class DetailComponent {
    constructor(googleApiService, route, bookService) {
        this.googleApiService = googleApiService;
        this.route = route;
        this.bookService = bookService;
    }
    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.googleApiService.idSearch(params.id).subscribe((data) => {
                this.data = data;
            });
        });
    }
    addToCart2() {
        let isAdded = false;
        if (!this.bookService.cartContent2) { // if empty cart
            this.bookService.cartContent2.push({ quantity: 1, bookObj: this.data });
        }
        else {
            for (let i = 0; i < this.bookService.cartContent2.length; i++) {
                if (this.bookService.cartContent2[i].bookObj.id == this.data.id) {
                    this.bookService.cartContent2[i].quantity++;
                    isAdded = true;
                    if (this.data.saleInfo.listPrice) {
                        this.bookService.totalPrice += this.data.saleInfo.listPrice.amount;
                        this.bookService.totalPrice = Math.round(this.bookService.totalPrice * 100) / 100;
                    }
                    else {
                        this.bookService.totalPrice += 10;
                    }
                    break;
                }
            }
            if (!isAdded) {
                this.bookService.cartContent2.push({ quantity: 1, bookObj: this.data });
                if (this.data.saleInfo.listPrice) {
                    this.bookService.totalPrice += this.data.saleInfo.listPrice.amount;
                    this.bookService.totalPrice = Math.round(this.bookService.totalPrice * 100) / 100;
                }
                else {
                    this.bookService.totalPrice += 10;
                }
            }
        }
        console.log(this.data);
        console.log(this.bookService.cartContent2);
    }
};
DetailComponent = tslib_1.__decorate([
    Component({
        selector: 'app-detail',
        templateUrl: './detail.component.html',
        styleUrls: ['./detail.component.css']
    })
], DetailComponent);
export { DetailComponent };
//# sourceMappingURL=detail.component.js.map