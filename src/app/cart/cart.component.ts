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
  refundPrice(i:number):void{
    if(this.bookService.cartContent2[i].bookObj.saleInfo.listPrice){ // checks if price exist, in order to substract it when removing
      this.bookService.totalPrice -= this.bookService.cartContent2[i].bookObj.saleInfo.listPrice.amount
    }
    else{
      this.bookService.totalPrice -= 10;

    }
  }
  removeArticle(bookId:String):void{
    for (let i=0;i<this.bookService.cartContent2.length;i++){
      console.log(this.bookService.cartContent2[i].bookObj.id)
      console.log(bookId)
      if(this.bookService.cartContent2[i].bookObj.id === bookId){
        
        console.log("removed")
        if(this.bookService.cartContent2[i].quantity>1){ // case if more than 1 article in quantity
          this.refundPrice(i);
          this.bookService.cartContent2[i].quantity--
        }
        else{ // if 1 article, remove from the array
          this.refundPrice(i);
          this.bookService.cartContent2.splice(i,i+1)
        }
      }

    }
  }
}
