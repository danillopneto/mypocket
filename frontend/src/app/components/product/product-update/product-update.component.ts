import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../messages/message.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    id: '',
    description: '',
    price: null
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.productService.get(id).subscribe(product => {
        if (product != null) {
          this.product = product;
        }
      });
    }
  }

  updateProduct(): void {
    this.productService.save(this.product).then(() => {
      this.messageService.showMessage(`Produto ${this.product!.description} atualizado!`);
      this.cancel();
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
