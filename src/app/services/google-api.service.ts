import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TemplateBindingParseResult } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import {finalize,delay} from 'rxjs/operators'
import {Bookquery} from '../bookquery'

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  savedBook:Bookquery = new Bookquery;
  private baseURL:string ="https://www.googleapis.com/books/v1/volumes?q=";
  newURL:string = this.baseURL;
  maxResult:number = 20;
  public data:any = null;
  public idData:any = null;
  public dataIndex:number = -1;
  public id:String = null;


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
  idSearch(id:String){
    return this.http.get("https://www.googleapis.com/books/v1/volumes/"+id)
  }
  queryBuild(query:string,queryType:string,sortType:string,maxResults:string,startIndex:string):string {
    return this.baseURL+queryType+":"+query+maxResults+sortType+startIndex;
  }
  queryBuildIsbn(isbnCode:string):string{
    return this.baseURL+"isbn:"+isbnCode;
  }
}

