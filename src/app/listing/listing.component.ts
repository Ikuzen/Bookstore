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
  constructor(private googleApiService : GoogleApiService) { }

  ngOnInit() {
    this.book.author = "Alice";
  }
  fetchInfos(data):void{
    this.book.author = data.volumeInfo.authors[0];
    this.book.title = data.volumeInfo.title;
    this.book.id = data.id;
    this.book.smallThumbnail = data.volumeInfo.imageLinks.smallThumbnail;
    this.book.price = data.saleInfo.listPrice.amount;
  }

}
