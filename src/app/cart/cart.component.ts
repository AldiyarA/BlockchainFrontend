import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { AllService } from '../services/all.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() cart: Cart = null
  @Input() index: number = 1
  productQuantity: object = {}
  productManageQuantity: object = {}
  products: Product[] = []
  totalPrice = 0
  constructor(private service: AllService) { }

  ngOnInit(): void {
    this.loadProducts()
  }
  loadProducts(){
    this.cart.products.forEach(order=>{
      this.service.getProduct(order.productId).subscribe(product=>{
        this.products.push(product)
      })
      this.productQuantity[order.productId] = order.quantity
      this.productManageQuantity[order.productId] = false
    })
    // this.service.getProduct
  }
  totalCost(): number{
    let cost = 0
    this.products.forEach(product=>{
      cost+=(product.price*this.productQuantity[product.id])
    })
    return cost
  }
  isManage(productId: number): boolean{
    return this.productManageQuantity[productId]
  }
  buy(){
    if (!this.cart.departureDate){
      // console.warn("Departure date can't be null")
      window.alert("Departure date can't be null")
      return
    }
    if (!this.cart.arrivalDate){
      // console.warn("Arrival date can't be null")
      window.alert("Arrival date can't be null")
      return
    }
    let zeros: number[] = []
    this.products.forEach(product=>{
      if (this.productQuantity[product.id] == 0){
        zeros.push(product.id)
      }
    })
    zeros.forEach(z=>{
      this.products = this.products.filter(p=>p.id!=z)
    })
    this.cart.isBooked=true
    this.cart.status="On picking"
    setTimeout(()=>{
      this.cart.status="On Way"
      setTimeout(()=>{this.cart.status="Delivered"}, 5000)
  }, 5000)
  }
}
