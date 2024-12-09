import { Component, inject, ViewChild } from '@angular/core';


import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoryService } from '../../../Services/category.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { category } from '../../../types/category';
import { Brand } from '../../../types/brand';
import { BrandService } from '../../../Services/brand.service';
import { ProductService } from '../../../Services/product.service';
@Component({
  selector: 'app-products',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule , MatButtonModule, RouterLink ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {displayedColumns: string[] = ['id', 'name','shortDescription','price','discount', 'action'];
  dataSource: MatTableDataSource<Brand>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 


  productservice=inject( ProductService);
  constructor() {
     this.dataSource = new MatTableDataSource([]as any);
  }
  ngOnInit(){
    this.getServerData();
  }

  private getServerData() {
    this.productservice.getAllProducts().subscribe((result) => {
      console.log('API reponse:', result);
      this.dataSource.data = result;

    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(id:string){
    this.productservice.deleteProduct(id).subscribe(result=>{
      alert("Product deleted");
      this.getServerData();
    })
    
  }


}