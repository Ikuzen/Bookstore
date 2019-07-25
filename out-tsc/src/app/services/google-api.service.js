import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Bookquery } from '../bookquery';
let GoogleApiService = class GoogleApiService {
    constructor(http) {
        this.http = http;
        this.savedBook = new Bookquery;
        this.baseURL = "https://www.googleapis.com/books/v1/volumes?q=";
        this.newURL = this.baseURL;
        this.maxResult = 20;
        this.data = null;
        this.idData = null;
        this.dataIndex = -1;
        this.id = null;
        this.loading = true;
        this.error = null;
        http.get(this.newURL)
            .pipe(finalize(() => {
            this.loading = false;
        }))
            .subscribe((data) => {
            console.log(data); // first callback : success
            this.data = data;
            this.loading = false;
        }, (error) => {
            console.log(error);
            this.error = error.statusText;
            this.loading = false;
        });
    }
    search(url) {
        console.log(url);
        this.http.get(url).subscribe((data) => {
            this.data = data;
            console.log(this.data);
        });
    }
    mresults(num) {
        this.maxResult = num;
    }
    idSearch(id) {
        return this.http.get("https://www.googleapis.com/books/v1/volumes/" + id);
    }
    queryBuild(query, queryType, sortType, maxResults, startIndex, subject) {
        return this.baseURL + queryType + ":" + query + maxResults + sortType + startIndex + subject;
    }
    queryBuildIsbn(isbnCode) {
        return this.baseURL + "isbn:" + isbnCode;
    }
};
GoogleApiService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], GoogleApiService);
export { GoogleApiService };
//# sourceMappingURL=google-api.service.js.map