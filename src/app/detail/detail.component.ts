import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from '../services/google-api.service';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service'


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  data: any;
  constructor(public googleApiService: GoogleApiService, private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.googleApiService.idSearch(params.id).subscribe((data) => {
        this.data = data;

      })
    });
  }
  addToCart2(): void { // add to cart with a new api request using the id, needed when adding from details component
    let isAdded:boolean = false;
    if (!this.bookService.cartContent2) { // if empty cart
      this.bookService.cartContent2.push({ quantity: 1, bookObj: this.data });
    }
    else{
    for (let i = 0; i < this.bookService.cartContent2.length; i++) {
      
        if (this.bookService.cartContent2[i].bookObj.id == this.data.id) {
          this.bookService.cartContent2[i].quantity++;
          isAdded = true;
          if (this.data.saleInfo.listPrice) {
            this.bookService.totalPrice += +this.data.saleInfo.listPrice.amount.toFixed(2)
          } else {
            this.bookService.totalPrice += +(10).toFixed(2);
          }
          break;
        }
    }
    if(!isAdded){
        this.bookService.cartContent2.push({ quantity: 1, bookObj: this.data });
        if (this.data.saleInfo.listPrice) {
          this.bookService.totalPrice += +this.data.saleInfo.listPrice.amount.toFixed(2)
        } else {
          this.bookService.totalPrice += +(10).toFixed(2);
        }
    }
  }
    console.log(this.data)
    console.log(this.bookService.cartContent2)
  }
}

