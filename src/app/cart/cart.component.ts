import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from '../services/google-api.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  data:any
  constructor(public googleApiService:GoogleApiService, public bookService:BookService) { }

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
}