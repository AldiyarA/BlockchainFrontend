import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { FilterComponent } from './filter/filter.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { CartComponent } from './cart/cart.component';
import { CartListComponent } from './cart-list/cart-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductFilterComponent,
    FilterComponent,
    MainComponent,
    CartComponent,
    CartListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    {
      provide: 'apiUrl',
      useValue: 'https://fakestoreapi.com/'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
