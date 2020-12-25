import { EMPTY, Observable } from 'rxjs';
import { MessageService } from './messages/message.service';

export abstract class BaseAngularService<T>{

  constructor(protected messageService: MessageService) { }

  errorHandler(e: any): Observable<any> {
    console.log(e);
    this.messageService.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
