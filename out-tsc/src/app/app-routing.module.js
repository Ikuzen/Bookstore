import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { DetailComponent } from './detail/detail.component';
import { CartComponent } from './cart/cart.component';
const routes = [
    { path: 'listing', component: ListingComponent },
    { path: 'detail/:id', component: DetailComponent },
    { path: 'cart', component: CartComponent },
    { path: '', redirectTo: '/listing', pathMatch: 'full' },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map