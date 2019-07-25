import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { DetailComponent } from './detail/detail.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  { path: 'listing', component: ListingComponent },
  { path:'detail/:id',component: DetailComponent},
  { path:'cart',component: CartComponent},
  { path: '', redirectTo: '/listing', pathMatch: 'full' }, // default redirect to listing (when path is '')
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
