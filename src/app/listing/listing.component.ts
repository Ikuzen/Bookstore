import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from '../services/google-api.service';
import {allBooks} from '../services/book.service'
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
    this.book.currentIndex = 0;
  }
  saveId(id:string):void{
    this.googleApiService.dataId = id;
  }
  fetchInfos(data):void{
    this.book.author = data.volumeInfo.authors[0];
    this.book.title = data.volumeInfo.title;
    this.book.id = data.id;
    this.book.smallThumbnail = data.volumeInfo.imageLinks.smallThumbnail;
    this.book.price = data.saleInfo.listPrice.amount;
  }
  searchBtn(queryType):void{
    this.book.currentIndex = 0;
    this.book.savedToSearch = this.book.toSearch
    if(queryType === 'isbn'){
      this.googleApiService.search(this.googleApiService.queryBuildIsbn(this.book.toSearch))

    }
    else{
      this.googleApiService.search(this.googleApiService.queryBuild(this.book.toSearch,this.book.qType,this.book.sortType,this.book.maxResults,this.book.startIndex))
    }
  }
  indexIncrementer(maxResults):void{
    if(maxResults === '&maxResults=10'){
      this.book.currentIndex += 10;
    }
    else if(maxResults === '&maxResults=20'){
      this.book.currentIndex += 20;
    }
    else if(maxResults === '&maxResults=30'){
      this.book.currentIndex += 30;
    }
    else if(maxResults === '&maxResults=40'){
      this.book.currentIndex += 40;
    }
  }
  indexDecrementer(maxResults):void{
    if(maxResults === '&maxResults=10'){
      this.book.currentIndex -= 10;
    }
    else if(maxResults === '&maxResults=20'){
      this.book.currentIndex -= 20;
    }
    else if(maxResults === '&maxResults=30'){
      this.book.currentIndex -= 30;
    }
    else if(maxResults === '&maxResults=40'){
      this.book.currentIndex -= 40;
    }
  }
  firstPage(){
    this.book.startIndex = '&startIndex=0'
    this.googleApiService.search(this.googleApiService.queryBuild(this.book.savedToSearch,this.book.qType,this.book.sortType,this.book.maxResults,this.book.startIndex))
    this.book.currentIndex = 0;
  }
  nextPage(){
    this.indexIncrementer(this.book.maxResults)
    this.book.startIndex = `&startIndex=${this.book.currentIndex}`
    this.googleApiService.search(this.googleApiService.queryBuild(this.book.savedToSearch,this.book.qType,this.book.sortType,this.book.maxResults,this.book.startIndex))}

previousPage(){
    this.indexDecrementer(this.book.maxResults)
    this.book.startIndex = `&startIndex=${this.book.currentIndex}`
    this.googleApiService.search(this.googleApiService.queryBuild(this.book.savedToSearch,this.book.qType,this.book.sortType,this.book.maxResults,this.book.startIndex))}
}
