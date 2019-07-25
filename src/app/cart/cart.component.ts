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
  removeArticle(bookId:String):void{
    for (let i=0;i<this.bookService.cartContent2.length;i++){
      console.log(this.bookService.cartContent2[i].bookObj.id)
      console.log(bookId)
      if(this.bookService.cartContent2[i].bookObj.id === bookId){
        
        console.log("removed")
        if(this.bookService.cartContent2[i].quantity>1){ // case if more than 1 article in quantity
          // this.refundPrice(i);
          
          this.bookService.cartContent2[i].quantity--
          this.countFullPrice()
        }
        else{ // if 1 article, remove from the array
          // this.refundPrice(i);
          this.bookService.cartContent2.splice(i,i+1)
          this.countFullPrice()

        }
      }

    }
  }
  discount(quantity:number,price:number):number{ // if quantity > 10 : 10% redux !
    if(quantity >= 10){
    return Math.round(price*0.90*100)/100;
    }
    else{
      return Math.round(price*0.95*100)/100;

    }
  }
  discountDisplayer(quantity:number):string{
    if(quantity >= 10){
      return "10% off";
      }
      else{
      return "5% off";
  
      }
  }
  countFullPrice(){
    this.bookService.totalPrice = 0;
    for(let i=0;i<this.bookService.cartContent2.length;i++){
      console.log(this.bookService.cartContent2[i].quantity)
      console.log(this.bookService.cartContent2[i].bookObj)

      if(this.bookService.cartContent2[i].quantity >= 10){ // discount = 10%
        if(this.bookService.cartContent2[i].bookObj.saleInfo.listPrice){// if price exists
          this.bookService.totalPrice += this.bookService.cartContent2[i].quantity*parseInt(this.bookService.cartContent2[i].bookObj.saleInfo.listPrice.amount)*0.9
           console.log(this.bookService.cartContent2[i].quantity*parseInt(this.bookService.cartContent2[i].bookObj.saleInfo.listPrice.amount)*0.9)
        }
        else{
          this.bookService.totalPrice +=this.bookService.cartContent2[i].quantity*10
        }
      }
      else if(this.bookService.cartContent2[i].quantity <10){ //discount = 5%
        if(this.bookService.cartContent2[i].bookObj.saleInfo.listPrice){// if price exists
          this.bookService.totalPrice += this.bookService.cartContent2[i].quantity*parseInt(this.bookService.cartContent2[i].bookObj.saleInfo.listPrice.amount)*0.95
          console.log(this.bookService.cartContent2[i].quantity*parseInt(this.bookService.cartContent2[i].bookObj.saleInfo.listPrice.amount)*0.9)

        }
        else{
          this.bookService.totalPrice += this.bookService.cartContent2[i].quantity*10
        }
        
      }
      console.log(this.bookService.totalPrice)
    }
    this.bookService.totalPrice = Math.round(this.bookService.totalPrice*100)/100
  }
}
