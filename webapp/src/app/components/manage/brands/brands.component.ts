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

@Component({
  selector: 'app-brands',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule , MatButtonModule, RouterLink ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<Brand>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 


  brandservices=inject(BrandService);

  constructor() {
    this.getServerData();
    this.dataSource = new MatTableDataSource([]as any);
  }

  private getServerData() {
    this.brandservices.getBrands().subscribe((result) => {
      console.log('API reponse:', result);
      this.dataSource = new MatTableDataSource(result);

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
    console.log(id);
    this.brandservices.deleteBrandById(id).subscribe((result:any)=>{
      alert("Brand deleted. ");
      this.getServerData();
    })
  }

}
