import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { AllService } from '../services/all.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = []
  loading = false
  constructor(private service: AllService,
              private route: ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit(): void {
    console.log(1)
    this.loadProducts()
    // this.filterProducts()
  }
  loadProducts() {
    this.loading = true
    this.service.getProductList().subscribe(p=>{
      this.loading = false
      this.route.paramMap.subscribe(param=>{
        console.log(param)
        let fragment = param.get('search')
        let price = param.get('price')
        let rating = param.get('rating')
        let categories = param.get('categories')
        if (fragment){
          console.log(fragment)
          if (fragment!="null"){
            p = this.filterProductsFragment(p, fragment.split('_').join(' '))
          }
        }
        if (price){
          if (price!="null"){
            p = this.filterProductsPrice(p, price)
          }
        }
        if (rating){
          if (rating!="null"){
            p = this.filterProductsRating(p, rating)
          }
        }
        if (categories){
          if (categories!="null"){
            p = this.filterProductsCategories(p, categories)
          }
        }
        this.products = p
      })
    })
  }
  filterProductsFragment(productList: Product[], fragment: string): Product[]{
    let products: Product[] = []
    productList.forEach(product=>{
      if (product.title.includes(fragment)){
        products.push(product)
      }
    })
    return products
  }
  filterProductsRating(productList: Product[], ratingStr: string): Product[]{
    let ratings = ratingStr.split('-')
    let products: Product[] = []
    productList.forEach(product=>{
      ratings.forEach(rating=>{
        if (product.rating.rate >= (+rating) && product.rating.rate < (+rating) + 1) products.push(product)
      })
    })
    return products
  }
  filterProductsPrice(productList: Product[], price: string): Product[]{
    let products: Product[] = []
    let prices = price.split("-")
    let minPrice = +prices[0]
    let maxPrice = +prices[1]
    productList.forEach(product=>{
      if (product.price >= minPrice && product.price <= maxPrice){
        products.push(product)
      }
    })
    return products
  }
  filterProductsCategories(productList: Product[], categoriesStr: string): Product[]{
    let products: Product[] = []
    let categories = categoriesStr.split('_').join(' ').split('+')
    productList.forEach(product=>{
      categories.forEach(category=>{
        if (product.category == category){
          products.push(product)
        }
      })
    })
    return products
  }
  cart(){
    this.router.navigate(['cart'])
  }
}
