import { Component, inject } from '@angular/core';
import { CategoryService } from '../../Services/category.service';
import { category } from '../../types/category';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  categoryService=inject(CategoryService);
  categoryList: category[]=[];
  ngOnInit(){
    this.categoryService.getCategories().subscribe(result=>{
      this.categoryList=result;
    })
  }
}
