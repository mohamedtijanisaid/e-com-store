    import { HttpClient } from '@angular/common/http';
    import { inject, Injectable } from '@angular/core';
    import { category } from '../types/category';

    @Injectable({
      providedIn: 'root'
    })
    export class CategoryService {
      http=inject(HttpClient);
      constructor() { }

    getCategories(){
      return this.http.get<category[]>("http://localhost:3000/Category/");
    }
    
    getCategoryById(id:string){
      return this.http.get<category>("http://localhost:3000/Category/" + id);
    }
    
    addcategory(name:string){
      return this.http.post("http://localhost:3000/Category",{
        name:name,
      });
    }
    Updatecategory(id:string,name:string){
      return this.http.put('http://localhost:3000/Category/ '+ id,{
        name:name,  
      });
    }
    deleteCategoryById(id:string){
      return this.http.delete("http://localhost:3000/Category/" + id);
    }

    }
