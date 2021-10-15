import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent implements OnInit {
  logged: boolean
  fragment = ""
  price: string
  rating: string
  categories: string
  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (id){
      this.logged = true
    }else{
      this.logged = false
    }
  }
  
  logOut(){
    localStorage.removeItem('userId');
    window.location.reload()
  }
  logIn(){
    localStorage.setItem('userId', "1");
    window.location.reload()
  }
  search(){
    let a = this.fragment.split(' ').join('_')
    if (!this.fragment.length) a = 'null'
    this.route.paramMap.subscribe(param=>{
      console.log(param)
      console.log("here")
      this.price = param.get('price')
      this.rating = param.get('rating')
      this.categories = param.get('categories')
      console.log(this.price)
      if (!this.categories) this.categories = 'null'
      if (!this.price) this.price = 'null'
      if (!this.rating) this.rating = 'null'
      this.router.navigate(['products', this.price, this.rating, this.categories, a])
      setTimeout(() =>{window.location.reload()}, 10000)
    })
  }
  home(){
    this.router.navigate(['products'])
  }
  cart(){
    this.router.navigate(['cart'])
  }
}

// this.route.paramMap.subscribe(param=>{
//   console.log(param)
//   console.log("here")
//   this.price = param.get('price')
//   this.rating = param.get('rating')
//   this.categories = param.get('categories')
//   console.log(this.price)
//   if (!this.categories) this.categories = 'null'
//   if (!this.price) this.price = 'null'
//   if (!this.rating) this.rating = 'null'
// })