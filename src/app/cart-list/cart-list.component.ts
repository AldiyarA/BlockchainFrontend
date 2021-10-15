import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../models/cart';
import { AllService } from '../services/all.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  userId: number
  carts: Cart[]
  constructor(private service: AllService,
    private router: Router) { }
  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (id){
      this.userId = +id
    }else{
      this.router.navigate([''])
    }
    this.loadData()
  }
  loadData(){
    this.service.getCarts(this.userId).subscribe(carts=>{
      this.carts=carts
    })
  }
  indexOfCart(cart: Cart): number{
    return this.carts.indexOf(cart) + 1
  }
}
