import { Injectable } from '@angular/core';
import { GoogleApiService } from './google-api.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  cartContent: any[] =[];
  idToBook: any;
  constructor(public googleApiService: GoogleApiService, private bookService: BookService) { }
  // getBook(id: number): Observable<Hero> {
  //   this.googleApiService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }
  addToCart(bookId: any): void {
    for(let book of this.googleApiService.data.items){
      if (book.id === bookId){
        this.cartContent.push(book);
      }
    }
    

  }
}
