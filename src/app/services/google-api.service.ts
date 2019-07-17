import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TemplateBindingParseResult } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import {finalize,delay} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  baseURL:string ="https://www.googleapis.com/books/v1/volumes?q=";
  newURL:string = this.baseURL;
  maxResult:number = 20;
  data = null;
  loading = true;
  error =  null;
  
  constructor(private http: HttpClient) {
    http.get(this.newURL)
    .pipe(
      finalize(()=>{ // callback at the end always
        this.loading = false; 
      })
    )
    .subscribe(
      (data) => {//.get returns an observable
      console.log(data); // first callback : success
      this.data = data;
      this.loading = false;
    },(error) =>{
      console.log(error);
      this.error = error.statusText;
      this.loading = false;
    });
  }
  search(url:string){
    console.log(url)
    this.http.get(url).subscribe((data) => {
      this.data = data;
      console.log(this.data)
    
  })}
  mresults(num : number){
    this.maxResult = num;
  }
  queryBuild(query:string,queryType:string):string {
    return this.baseURL+queryType+":"+query+"&maxResult=40"+"startIndex=0";
  }
  // showMore(){
  //   this.booksService.search(this.search this.searchResults.items.length).subscribe
  //   console.log(data)
  //   this.searchResults.items.push(...this.data.items);
  // }, (error) => {
  //   console.log(error)
  // }
  // }
}

