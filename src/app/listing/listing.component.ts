import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from '../services/google-api.service';
import {Bookquery} from '../bookquery'
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  book:Bookquery;
  constructor(private googleApiService : GoogleApiService) { }

  ngOnInit() {
    this.book.author = "Alice";
  }
  

}
