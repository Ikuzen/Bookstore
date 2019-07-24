import { Injectable } from '@angular/core';
import { GoogleApiService } from './google-api.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  cartContent: any[] =[];
  totalPrice:number = 0;
  constructor(public googleApiService: GoogleApiService) { }
  addToCart(bookId: String): void { // add to cart with stored datas : no need to do a new api request
    for(let book of this.googleApiService.data.items){
      if (book.id === bookId){
        this.cartContent.push(book);
        if(book.saleInfo.listPrice){
          this.totalPrice += book.saleInfo.listPrice.amount
        }else{
          this.totalPrice += 10;
        }
      }
    }
  }
  addToCart2(bookId: String):void{ // add to cart with a new api request using the id, needed when adding from details component
      this.googleApiService.idSearch(bookId).subscribe((book:any) => {
        this.cartContent.push(book);
        if(book.saleInfo.listPrice){
          this.totalPrice += book.saleInfo.listPrice.amount
        }
        else{
          this.totalPrice += 10;
        }
      })
  }

  
}
