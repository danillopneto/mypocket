import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MessageService } from './messages/message.service';
import { BaseResourceModel } from './base-resource.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseAngularService<T extends BaseResourceModel>{

  protected abstract baseUrl: string;
  protected defaultOrderBy: string = 'description';

  constructor(
    protected db: AngularFireDatabase,
    protected messageService: MessageService) { }

  getAll(orderBy?: string): Observable<T[]> {
    var order = orderBy != null &&  orderBy != ''
                  ? orderBy
                  : this.defaultOrderBy;

    return this.db.list<T>(this.baseUrl, ref => ref.orderByChild(order)).valueChanges().pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );;
  }

  get(id: string): Observable<T | null> {
    return this.db.object<T>(`${this.baseUrl}/${id}`).valueChanges().pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  save(model: T): Promise<void> {
    if (model.id == null || model.id == '') {
      model.id = uuidv4();
    }

    return this.db.database.ref(`${this.baseUrl}/${model.id}`).set({ ...model }).catch((reason: any) => {
      this.errorHandler(reason);
    });
  }

  delete(id: string): Promise<void> {
    return this.db.object(`${this.baseUrl}/${id}`).remove().catch((reason: any) => {
      this.errorHandler(reason);
    });
  }

  errorHandler(e: any): Observable<any> {
    console.log(e);
    this.messageService.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
