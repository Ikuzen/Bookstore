import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let BookService = class BookService {
    constructor(googleApiService) {
        this.googleApiService = googleApiService;
        this.cartContent = [];
        this.cartContent2 = [];
        this.totalPrice = 0;
        this.isExpended = false;
    }
    addToCart(bookId) {
        // for(let book of this.googleApiService.data.items)
        for (let i = 0; i < this.googleApiService.data.items.length; i++) {
            if (this.googleApiService.data.items[i].id === bookId) {
                if (!this.cartContent2[i])
                    this.cartContent2.push({ quantity: 1, bookObj: this.googleApiService.data.items[i] });
                else {
                    this.cartContent2[i].quantity++;
                }
                if (this.googleApiService.data.items[i].saleInfo.listPrice) { // price increment
                    this.totalPrice += Math.round((+this.googleApiService.data.items[i].saleInfo.listPrice.amount.toFixed(2)) * 100) / 100;
                }
                else {
                    this.totalPrice += +(10).toFixed(2);
                }
            }
        }
        console.log(this.cartContent2);
    }
    // fetchBook(bookId: String):any {
    //   this.googleApiService.idSearch(bookId).subscribe((book: any) => {
    //     console.log(book)
    //     return book;
    //   })
    // }
    // addToCart2(bookId: String): void { // add to cart with a new api request using the id, needed when adding from details component
    //   let book = this.fetchBook(bookId);  
    //   for (let i = 0; i < this.cartContent2.length; i++) {
    //     if (!this.cartContent2[i])
    //         this.cartContent2.push({ quantity: 1, bookObj: book });
    //       else {
    //         this.cartContent2[i].quantity++;
    //       }
    //       if (this.googleApiService.data.items[i].saleInfo.listPrice) {
    //         this.totalPrice += +book.saleInfo.listPrice.amount.toFixed(2)
    //       } else {
    //         this.totalPrice += +(10).toFixed(2);
    //       }
    //       console.log(this.cartContent2)
    //   }
    // }
    expendCart() {
        this.isExpended = true;
    }
};
BookService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], BookService);
export { BookService };
//# sourceMappingURL=book.service.js.map