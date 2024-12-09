import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Product } from "../types/product";
import { catchError, of } from "rxjs";
@Injectable({
  providedIn:'root'
})
export class ProductService{

  constructor(){}
  http=inject(HttpClient);
   
  getAllProducts(){
    return this.http.get<Product[]>(environment.apiUrl+"/product");
  }

  getFeaturedProducts() {
    return this.http
      .get<Product[]>(environment.apiUrl + '/product/featured-products')
      .pipe(
        catchError((error) => {
          console.error('Error fetching featured products:', error);
          return of([]); // Retourner un tableau vide en cas d'erreur
        })
      );
  }

  getNewProducts() {
    return this.http
      .get<Product[]>(environment.apiUrl + '/product/new-products')
      .pipe(
        catchError((error) => {
          console.error('Error fetching new products:', error);
          return of([]); // Retourner un tableau vide en cas d'erreur
        })
      );
  }

  getProducbyId(id:string){
    return this.http.get<Product>(environment.apiUrl+"/product/"+id);
  }



  addProduct(model:Product){
    return this.http.post(environment.apiUrl+"/product",model);
  }
  updateProduct(id:string , model:Product){
    return this.http.put(environment.apiUrl+"/product/"+id, model);
  }
  deleteProduct(id:string ){
    return this.http.delete(environment.apiUrl+"/product/"+id);
  }








}