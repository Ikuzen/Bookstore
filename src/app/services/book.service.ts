import { Injectable } from '@angular/core';
import { GoogleApiService } from './google-api.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  allBooks:any[];
  constructor(private googleApiService:GoogleApiService) { }
  // getBook(id: number): Observable<Hero> {
  //   this.googleApiService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }
  storeBooks(bookArr:Object):void{
    this.allBooks.push(bookArr)
  }
}
