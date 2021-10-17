import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AllService {
    private BASE_URL = 'https://fakestoreapi.com';
    
    constructor(private client: HttpClient) {}

    getProductList(): Observable<Product[]> {
        return this.client.get<Product[]>(`${this.BASE_URL}/products`);
    }
    getProduct(id: number): Observable<Product> {
        return this.client.get<Product>(`${this.BASE_URL}/products/${id}/`);
    }
    getUser(id: number): Observable<User>{
        return this.client.get<User>(`${this.BASE_URL}/users/${id}/`)
    }
    getCarts(userId: number): Observable<Cart[]>{
        return this.client.get<Cart[]>(`${this.BASE_URL}/carts/user/${userId}`)
    }
}