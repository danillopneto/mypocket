import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { MessageService } from './../messages/message.service';
import { BaseAngularService } from '../base-angular.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseAngularService<Product> {

  protected baseUrl = '/products';

  constructor(
    protected db: AngularFireDatabase,
    protected messageService: MessageService,
    private http: HttpClient) {
    super(db, messageService);
  }
}
