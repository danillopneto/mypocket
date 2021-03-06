import { ProductService } from './../product.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../product.model';
import { MessageService } from '../../messages/message.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product!: Product;
  productId!: string;

  constructor(
    public dialogRef: MatDialogRef<ProductDeleteComponent>,
    private productService: ProductService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.productId = data;
  }

  ngOnInit(): void {
    this.productService.get(this.productId).subscribe(product => {
      if (product != null) {
        this.product = product;
      }
    });
  }

  deleteProduct() {
    this.productService.delete(this.product!.id!).then(() => {
      this.messageService.showMessage(`O produto ${this.product!.description} foi excluído!`);
      this.dialogRef.close(true);
    });
  }
}
