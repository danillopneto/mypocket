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
    id: '',
    description: '',
    price: null
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  createProduct(): void {
    this.productService.save(this.product).then(() => {
      this.messageService.showMessage(`Produto ${this.product.description} criado!`);
      this.cancel();
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
