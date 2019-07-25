import { google } from '../../../node_modules/JSONStream';
import { from } from 'rxjs';
const bookService = google.books({
    version: 'v1'
});
console.log('Getting books');
const booksObs = from(bookService.volumes.list({
    q: 'le malade imaginaire',
    startIndex: 1,
    maxResults: 40
}));
booksObs.subscribe(val => {
    console.log('Books received:');
    if (val.data && val.data.items) {
        const books = val.data.items.map(x => {
            const title = x.volumeInfo.title;
            const publisher = x.volumeInfo.publisher;
            const description = x.volumeInfo.description;
            return {
                title,
                publisher,
                description
            };
        });
        console.log(books);
    }
    else {
        console.log('Not found');
    }
});
//# sourceMappingURL=test.js.map