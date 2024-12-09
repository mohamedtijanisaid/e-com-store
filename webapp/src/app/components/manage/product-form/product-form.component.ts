import { Component, Inject, inject } from '@angular/core';
import { Form, FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Brand } from '../../../types/brand';
import { category } from '../../../types/category';
import { CategoryService } from '../../../Services/category.service';
import { BrandService } from '../../../Services/brand.service';
import { ProductService } from '../../../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-product-form',
  standalone : true,
  imports: [ReactiveFormsModule , MatInputModule , MatButtonModule , MatSelectModule ,MatCheckboxModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
formBuilder=inject(FormBuilder);
productForm=this.formBuilder.group({
    name: [null , [Validators.required,Validators.minLength(5)]],
    shortDescription: [null , [Validators.required,Validators.minLength(10)]],
    description: [null , [Validators.required,Validators.minLength(15)]],
    price: [null , [Validators.required]],
    discount: [],
    images: this.formBuilder.array([]), // Tableau pour les images
    categoryId: [null , [Validators.required]],
    brandId: [null , [Validators.required]],
    isFeatured:[false],
    isNewProduct:[false],
});
categoryService=inject(CategoryService);
brandService=inject(BrandService);
productService=inject(ProductService);
brands:Brand[]=[];
categories:category[]=[];
id!:string;
route=inject(ActivatedRoute);


ngOnInit(){
  
  this.categoryService.getCategories().subscribe(result=>{
     this.categories=result;
  });
  this.brandService.getBrands().subscribe(result=>{
    this.brands=result;
 });
 this.id=this.route.snapshot.params["id"];
 console.log(this.id);
if(this.id){
   this.productService.getProducbyId(this.id).subscribe(result=>{
    for (let index = 0; index < result.images.length; index++) {
      
      this.addImage(); 
    }
    this.productForm.patchValue(result as any);
   })
}else{
  this.addImage();
}

}
router=inject(Router);
addProduct(){
  let value=this.productForm.value;
  console.log(value);
  this.productService.addProduct(value as any).subscribe(result=>{
    alert("Product Added")
    this.router.navigateByUrl("/admin/products")
  });
}
updateProduct(){
  let value=this.productForm.value;
  console.log(value);
  this.productService.updateProduct(this.id , value as any).subscribe(result=>{
    alert("Product Updated")
    this.router.navigateByUrl("/admin/products")
  });

}

addImage(){
  this.images.push(this.formBuilder.control(null));
}
removeImage(){
  this.images.removeAt(this.images.controls.length-1)
}
get images(){
  return this.productForm.get('images') as FormArray;
}

}
