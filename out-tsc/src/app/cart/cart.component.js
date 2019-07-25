import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let CartComponent = class CartComponent {
    constructor(googleApiService, bookService) {
        this.googleApiService = googleApiService;
        this.bookService = bookService;
    }
    ngOnInit() {
        this.data = this.googleApiService.data;
    }
    // refundPrice(i:number):void{
    //   if(this.bookService.cartContent2[i].bookObj.saleInfo.listPrice){ // checks if price exist, in order to substract it when removing
    //     this.bookService.totalPrice -=this.bookService.cartContent2[i].bookObj.saleInfo.listPrice.amount;
    //     this.bookService.totalPrice = Math.round(this.bookService.totalPrice*100)/100
    //   }
    //   else{
    //     this.bookService.totalPrice -= 10;
    //   }
    // }
    removeArticle(bookId) {
        for (let i = 0; i < this.bookService.cartContent2.length; i++) {
            console.log(this.bookService.cartContent2[i].bookObj.id);
            console.log(bookId);
            if (this.bookService.cartContent2[i].bookObj.id === bookId) {
                console.log("removed");
                if (this.bookService.cartContent2[i].quantity > 1) { // case if more than 1 article in quantity
                    // this.refundPrice(i);
                    this.bookService.cartContent2[i].quantity--;
                    this.countFullPrice(this.bookService.totalPrice);
                }
                else { // if 1 article, remove from the array
                    // this.refundPrice(i);
                    this.bookService.cartContent2.splice(i, i + 1);
                    this.countFullPrice(this.bookService.totalPrice);
                }
            }
        }
    }
    discount(quantity, price) {
        if (quantity >= 10) {
            return Math.round(price * 0.90 * 100) / 100;
        }
        else {
            return Math.round(price * 0.95 * 100) / 100;
        }
    }
    discountDisplayer(quantity) {
        if (quantity >= 10) {
            return "10% off";
        }
        else {
            return "5% off";
        }
    }
    countFullPrice(basketContent) {
        this.bookService.totalPrice = 0;
        for (let i = 0; i < basketContent.length; i++) {
            if (basketContent.quantity >= 10) { // discount = 10%
                if (basketContent.bookObj.saleInfo.listPrice) { // if price exists
                    this.bookService.totalPrice += basketContent.quantity * basketContent.bookObj.saleInfo.listPrice.amount * 0.9;
                }
                else {
                    this.bookService.totalPrice += basketContent.quantity * 10;
                }
            }
            els;
            { //discount = 5%
                if (basketContent.bookObj.saleInfo.listPrice) { // if price exists
                    this.bookService.totalPrice += basketContent.quantity * basketContent.bookObj.saleInfo.listPrice.amount * 0.95;
                }
                else {
                    this.bookService.totalPrice += basketContent.quantity * 10;
                }
            }
            console.log(this.bookService.totalPrice);
        }
        this.bookService.totalPrice = Math.round(this.bookService.totalPrice * 100) / 100;
    }
};
CartComponent = tslib_1.__decorate([
    Component({
        selector: 'app-cart',
        templateUrl: './cart.component.html',
        styleUrls: ['./cart.component.css']
    })
], CartComponent);
export { CartComponent };
//# sourceMappingURL=cart.component.js.map