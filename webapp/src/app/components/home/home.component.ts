import { Component, inject } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../types/product';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 productService= inject(ProductService);
 newProducts : Product[]=[];
 featuredProducts : Product[]=[];
 ngOnInit(){
  this.productService.getFeaturedProducts().subscribe((result)=>{
    this.featuredProducts = result; 
    console.log("[DEBUG] Featured Products: ",result)
  });
  this.productService.getNewProducts().subscribe((result)=>{
    this.newProducts= result;
    console.log(result)
  });
 }
}
