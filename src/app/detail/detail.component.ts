import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from '../services/google-api.service';
import { ActivatedRoute } from '@angular/router';
import {BookService} from '../services/book.service'


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  data: any;
  constructor(public googleApiService: GoogleApiService, private route: ActivatedRoute, private bookService:BookService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.googleApiService.idSearch(params.id).subscribe((data) => {
        this.data = data;

      })
    });
  }



}
