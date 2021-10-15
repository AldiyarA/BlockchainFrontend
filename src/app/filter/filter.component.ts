import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { AllService } from '../services/all.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  minPrice: number
  maxPrice: number
  stars = [1, 2, 3, 4, 5]
  rating = [false, false, false, false, false]
  products: Product[] = []
  categories: string[] = []
  categoriesChecker: object
  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: AllService
              ) {}

  ngOnInit(): void {
    this.minPrice = 0
    this.maxPrice = 0
    this.getProducts()
  }
  filter(){
    let price = this.minPrice + "-" + this.maxPrice
    let categories = ""
    this.categories.forEach(category =>{
      // console.log(category)
      // console.log(this.categoriesChecker[category])
      if (this.categoriesChecker[category]){
        if (categories.length) categories+="+"
        categories+=category
      }
    })
    let r = ""
    this.stars.forEach(s => {
      if (this.rating[s]){
        if (r.length) r+='-'
        r+=s
      }
    })
    if (!categories.length) categories = "null"
    if (!r.length) r = "null"
    categories = categories.split(" ").join("_")
    this.route.paramMap.subscribe(param=>{
      console.log(param)
      let search = param.get('search')
      console.log(search)
      if (!search) search = 'null'
      this.router.navigate(['products', price, r, categories, search])
      setTimeout(() =>{window.location.reload()}, 100)
    })
  }
  reset(){
    this.updateData()
    this.router.navigate(['products'])
  }
  getProducts(){
    this.service.getProductList().subscribe(products => {
      this.products = products
      this.updateData()
    })
  }
  updateData(){
    this.categoriesChecker = {}
    this.products.forEach(product=>{
      if (product.price > this.maxPrice){
        this.maxPrice = product.price
        let isThere = false
        this.categories.forEach(category => {
          if (category == product.category){
            isThere = true
          }
        })
        if (!isThere){
          this.categories.push(product.category)
          this.categoriesChecker[product.category] = false
        }
      }
    })
  }
}
