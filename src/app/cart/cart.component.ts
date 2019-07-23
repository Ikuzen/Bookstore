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
  removeArticle(bookId:String):void{
    let isRemoved = false
    for (let i=0;i<this.bookService.cartContent.length;i++){
      if(this.bookService.cartContent[i].id === bookId && !isRemoved){
        if(this.bookService.cartContent[i].saleInfo.listPrice){ // checks if price exist, in order to substract it when removing
          this.bookService.totalPrice -= this.bookService.cartContent[i].saleInfo.listPrice.amount
        }
        else{
          this.bookService.totalPrice -= 10;

        }
        this.bookService.cartContent.splice(i,i+1)
        console.log("remmoved")
        isRemoved=true;
        break
        
      }

    }
  }
}
