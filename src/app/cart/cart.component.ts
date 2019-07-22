import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from '../services/google-api.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  data:any
  constructor(public googleApiService:GoogleApiService, public bookService:BookService) { }

  ngOnInit() {
    this.data = this.googleApiService.data;

  }

}
