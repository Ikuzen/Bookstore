import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from '../services/google-api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  data:any;
  constructor(public googleApiService:GoogleApiService, private route:ActivatedRoute) { }

  ngOnInit() {
    
    this.googleApiService.idSearch(this.route.params.value.id).subscribe((data)=>{
      this.data = data;
    })
  }


}
