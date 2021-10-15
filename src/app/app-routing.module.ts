import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './cart-list/cart-list.component';
import { MainComponent } from './main/main.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';

const routes: Routes = [
  {path: '', component:MainComponent, children:[
    {path: '', redirectTo: 'products', pathMatch: 'full'},
    {path : 'products', component: ProductFilterComponent},
    {path : 'cart', component: CartListComponent},
    {path : 'products/:price/:rating/:categories/:search', component: ProductFilterComponent},
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
