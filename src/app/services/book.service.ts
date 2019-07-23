import { Injectable } from '@angular/core';
import { GoogleApiService } from './google-api.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  cartContent: any[] =[];
  idToBook: any;
  constructor(public googleApiService: GoogleApiService) { }
  // getBook(id: number): Observable<Hero> {
  //   this.googleApiService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }
  addToCart(bookId: String): void { // add to cart with stored datas : no need to do a new api request
    for(let book of this.googleApiService.data.items){
      if (book.id === bookId){
        this.cartContent.push(book);
      }
    }
  }
  addToCart2(bookId: String):void{ // add to cart with a new api request using the id, needed when adding from details component
      this.googleApiService.idSearch(bookId).subscribe((book) => {
        this.cartContent.push(book);

      })
  }

  
}
