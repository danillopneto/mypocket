import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../messages/message.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: 'Produto de Teste',
    price: 125.98
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.messageService.showMessage('Produto criado!');
      this.cancel();
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
