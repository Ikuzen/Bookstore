import { Injectable } from '@angular/core';
import { GoogleApiService } from './google-api.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  cartContent: any[] =[];
  cartContent2: {
    quantity: number;
    bookObj: any;
}[] = [];
  totalPrice:number = 0;
  isExpended:boolean = false;
  constructor(public googleApiService: GoogleApiService) { }

  addToCart(bookId: String): void { // add to cart with stored datas : no need to do a new api request
    
    // for(let book of this.googleApiService.data.items)
    for (let i=0; i<this.googleApiService.data.items.length;i++){
      if (this.googleApiService.data.items[i].id === bookId){
        if(!this.cartContent2[i])
        this.cartContent2.push({quantity:1,bookObj:this.googleApiService.data.items[i]});
        else{
          this.cartContent2[i].quantity++;
        }
        if(this.googleApiService.data.items[i].saleInfo.listPrice){
          this.totalPrice += this.googleApiService.data.items[i].saleInfo.listPrice.amount
        }else{
          this.totalPrice += 10;
        }
      }
    }
    console.log(this.cartContent2)
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
  expendCart(){
    this.isExpended = true;
  }
  
}
