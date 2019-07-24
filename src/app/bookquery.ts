export class Bookquery {
  toSearch:string;
  savedToSearch:string;
  qType:string;
  sortType:string;
  maxResults:string;
  startIndex:string;
  currentIndex:number;
  isbn:string;
  id: number;
  title: string;
  author: string;
  price:number;
  subject:String;
  smallThumbnail:string;
  fullQuery:string;
  fullQueryIsbn:string
  thriller:{
    isChecked:boolean,
    query:String,
    builtQuery:String
  }
  fiction:{
    isChecked:boolean,
    query:String,
    builtQuery:String
  }
  suspense:{
    isChecked:boolean,
    query:String,
    builtQuery:String
  }
  historical:{
    isChecked:boolean,
    query:String,
    builtQuery:String
  }
  literary:{
    isChecked:boolean,
    query:String,
    builtQuery:String
  }
}