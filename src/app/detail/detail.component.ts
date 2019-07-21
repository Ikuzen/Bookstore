import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from '../services/google-api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  data:any;
  constructor(public googleApiService:GoogleApiService) { }

  ngOnInit() {
    this.data = this.googleApiService.data;
  }

}
