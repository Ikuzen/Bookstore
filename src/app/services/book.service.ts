import { Injectable } from '@angular/core';
import { GoogleApiService } from './google-api.service';
// import {CartComponent} from '../cart/cart.component'
@Injectable({
  providedIn: 'root'
})
export class BookService {
  cartContent: any[] = [];
  cartContent2: {
    quantity: number;
    bookObj: any;
  }[] = [];
  totalPrice: number = 0;
  isExpended: boolean = false;
  constructor(public googleApiService: GoogleApiService) { }

  addToCart(bookId: String): void { // add to cart with stored datas : no need to do a new api request

    // for(let book of this.googleApiService.data.items)
    for (let i = 0; i < this.googleApiService.data.items.length; i++) {
      if (this.googleApiService.data.items[i].id === bookId) {
        if (!this.cartContent2[i])
          this.cartContent2.push({ quantity: 1, bookObj: this.googleApiService.data.items[i] });
        else {
          this.cartContent2[i].quantity++;
        }
        this.countFullPrice()
        
      }
    }
    console.log(this.cartContent2)
  }

  removeArticle(bookId:String):void{
    for (let i=0;i<this.cartContent2.length;i++){
      console.log(this.cartContent2[i].bookObj.id)
      console.log(bookId)
      if(this.cartContent2[i].bookObj.id === bookId){
        
        console.log("removed")
        if(this.cartContent2[i].quantity>1){ // case if more than 1 article in quantity
          // this.refundPrice(i);
          
          this.cartContent2[i].quantity--
          this.countFullPrice()
        }
        else{ // if 1 article, remove from the array
          // this.refundPrice(i);
          this.cartContent2.splice(i,i+1)
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
    this.totalPrice = 0;
    for(let i=0;i<this.cartContent2.length;i++){
      console.log(this.cartContent2[i].quantity)
      console.log(this.cartContent2[i].bookObj)

      if(this.cartContent2[i].quantity >= 10){ // discount = 10%
        if(this.cartContent2[i].bookObj.saleInfo.listPrice){// if price exists
          this.totalPrice += this.cartContent2[i].quantity*parseInt(this.cartContent2[i].bookObj.saleInfo.listPrice.amount)*0.9
           console.log(this.cartContent2[i].quantity*parseInt(this.cartContent2[i].bookObj.saleInfo.listPrice.amount)*0.9)
        }
        else{
          this.totalPrice +=this.cartContent2[i].quantity*10
        }
      }
      else if(this.cartContent2[i].quantity <10){ //discount = 5%
        if(this.cartContent2[i].bookObj.saleInfo.listPrice){// if price exists
          this.totalPrice += this.cartContent2[i].quantity*parseInt(this.cartContent2[i].bookObj.saleInfo.listPrice.amount)*0.95
          console.log(this.cartContent2[i].quantity*parseInt(this.cartContent2[i].bookObj.saleInfo.listPrice.amount)*0.9)

        }
        else{
          this.totalPrice += this.cartContent2[i].quantity*10
        }
        
      }
      console.log(this.totalPrice)
    }
    this.totalPrice = Math.round(this.totalPrice*100)/100
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

}
