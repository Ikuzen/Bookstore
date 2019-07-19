import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from '../services/google-api.service';
import {Bookquery} from '../bookquery'
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  book:Bookquery = new Bookquery;
  // allBooks:Bookquery = []
  constructor(public googleApiService : GoogleApiService) { }

  ngOnInit() {
    this.book.author = "Alice";
    this.book.startIndex = '&startIndex=0'
  }
  fetchInfos(data):void{
    this.book.author = data.volumeInfo.authors[0];
    this.book.title = data.volumeInfo.title;
    this.book.id = data.id;
    this.book.smallThumbnail = data.volumeInfo.imageLinks.smallThumbnail;
    this.book.price = data.saleInfo.listPrice.amount;
  }
  searchBtn(queryType){
    if(queryType === 'isbn'){
      this.googleApiService.search(this.googleApiService.queryBuildIsbn(this.book.toSearch))
    }
    else{
      this.googleApiService.search(this.googleApiService.queryBuild(this.book.toSearch,this.book.qType,this.book.sortType,this.book.maxResults,this.book.startIndex))
    }
  }
  nextPage(){

  }
}
