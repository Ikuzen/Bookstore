import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from '../services/google-api.service';
import { Bookquery } from '../bookquery'
import { BookService } from '../services/book.service';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  book: Bookquery = new Bookquery;
  constructor(public googleApiService: GoogleApiService, public bookService: BookService) { }

  ngOnInit() {
    if (this.googleApiService.savedBook.startIndex) {
      this.book = this.googleApiService.savedBook;
    }
    else {
      this.book.startIndex = '&startIndex=0'
      this.book.currentIndex = 0;
    }
    this.book.fiction = { isChecked: false, query: "", builtQuery: "subject:Fiction" };
    this.book.thriller = { isChecked: false, query: "", builtQuery: "subject:Thriller" }
    this.book.suspense = { isChecked: false, query: "", builtQuery: "subject:Suspense" };
    this.book.historical = { isChecked: false, query: "", builtQuery: "subject:Historical" }
    this.book.literary = { isChecked: false, query: "", builtQuery: "subject:Literary" };


  }

  saveId(id: string): void {
    this.googleApiService.id = id;
  }

  duplicateQueryParams() {
    this.googleApiService.savedBook = this.book
  }

  checkSubject(subject: any): void {
    if (subject.isChecked) {
      subject.isChecked = false;
      subject.query = "";
      console.log(subject.query)
    }
    else if (!subject.isChecked) {
      subject.isChecked = true;
      subject.query = subject.builtQuery;
      console.log(subject.query)

    }

  }
  subjectQueryBuilder() {
    let subjectQuery: String = "";
    let subjectArr: String[] = [this.book.thriller.query, this.book.fiction.query, this.book.suspense.query, this.book.historical.query, this.book.literary.query]
    for (let subject of subjectArr) {

        if(subject){
        subjectQuery += "&" + subject;
        }
      
      
    }
    this.book.subject = subjectQuery
    console.log(subjectQuery)

  }
  searchBtn(queryType): void {
    this.book.currentIndex = 0;
    this.book.savedToSearch = this.book.toSearch;
    this.subjectQueryBuilder();
    this.book.fullQuery = this.googleApiService.queryBuild(this.book.toSearch, this.book.qType, this.book.sortType, this.book.maxResults, this.book.startIndex, this.book.subject);
    this.book.fullQueryIsbn = this.googleApiService.queryBuildIsbn(this.book.toSearch)
    this.duplicateQueryParams();
    if (queryType === 'isbn') {
      this.googleApiService.search(this.book.fullQueryIsbn)

    }
    else {
      this.googleApiService.search(this.book.fullQuery)
    }
  }

  indexIncrementer(maxResults): void {
    if (maxResults === '&maxResults=10') {
      this.book.currentIndex += 10;
    }
    else if (maxResults === '&maxResults=20') {
      this.book.currentIndex += 20;
    }
    else if (maxResults === '&maxResults=30') {
      this.book.currentIndex += 30;
    }
    else if (maxResults === '&maxResults=40') {
      this.book.currentIndex += 40;
    }
  }
  indexDecrementer(maxResults): void {
    if (maxResults === '&maxResults=10') {
      this.book.currentIndex -= 10;
    }
    else if (maxResults === '&maxResults=20') {
      this.book.currentIndex -= 20;
    }
    else if (maxResults === '&maxResults=30') {
      this.book.currentIndex -= 30;
    }
    else if (maxResults === '&maxResults=40') {
      this.book.currentIndex -= 40;
    }
  }
  getMaxResult(): number {
    let maxres = parseInt(this.book.maxResults.substring(this.book.maxResults.length - 2));
    return maxres;
  }
  getIndexLimit() {
    return this.googleApiService.data.totalItems - this.getMaxResult()
  }
  firstPage() {
    // this.scrollTop();
    this.book.startIndex = '&startIndex=0'
    this.googleApiService.search(this.googleApiService.queryBuild(this.book.savedToSearch, this.book.qType, this.book.sortType, this.book.maxResults, this.book.startIndex, this.book.subject))
    this.book.currentIndex = 0;
  }
  lastPage() {
    // this.scrollTop();
    this.book.startIndex = `&startIndex=${(parseInt(this.googleApiService.data.totalItems) - this.getMaxResult()).toString()}`
    this.googleApiService.search(this.googleApiService.queryBuild(this.book.savedToSearch, this.book.qType, this.book.sortType, this.book.maxResults, this.book.startIndex, this.book.subject))
    this.book.currentIndex = parseInt(this.googleApiService.data.totalItems) - this.getMaxResult();
    console.log(this.book.currentIndex);
  }
  nextPage() {
    // this.scrollTop();
    this.indexIncrementer(this.book.maxResults)
    this.book.startIndex = `&startIndex=${this.book.currentIndex}`
    this.googleApiService.search(this.googleApiService.queryBuild(this.book.savedToSearch, this.book.qType, this.book.sortType, this.book.maxResults, this.book.startIndex, this.book.subject))
  }

  previousPage() {
    // this.scrollTop()
    this.indexDecrementer(this.book.maxResults)
    this.book.startIndex = `&startIndex=${this.book.currentIndex}`
    this.googleApiService.search(this.googleApiService.queryBuild(this.book.savedToSearch, this.book.qType, this.book.sortType, this.book.maxResults, this.book.startIndex, this.book.subject))
  }

  scrollTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
