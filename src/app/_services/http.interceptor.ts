import {Inject} from '@angular/core';
import {HttpClient, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';


export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private _baseUrl: string
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(this._baseUrl);
    const jsonReq = req.clone({url: `${this._baseUrl}${req.url}`});
    return next.handle(jsonReq);
  }
}
