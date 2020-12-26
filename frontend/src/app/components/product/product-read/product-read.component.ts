import { MessageService } from './../../messages/message.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ProductReadDataSource } from './product-read-datasource';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatTable)
  table!: MatTable<Product>;
  dataSource!: ProductReadDataSource;

  displayedColumns = ['description', 'price', 'action'];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new ProductReadDataSource([]);
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(products => {
      this.setTableData(products);
    });
  }

  setTableData(products: Product[]): void {
    this.dataSource = new ProductReadDataSource(products);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  delete(id: string): void {
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }
}
