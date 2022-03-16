import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonService } from '../services/common.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
      private cs: CommonService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      return next.handle(request).pipe(
          tap(event => {
              this.cs.loader.next(true);
              if(event.type == HttpEventType.Response) {
                  if(event.status == 200) {
                      this.cs.loader.next(false)
                  }
              }
          })
      )
  }
}
