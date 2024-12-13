import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('authToken');
  const modifiedReq = token ? req.clone({
      setHeaders : {
          Authorization : `Bearer ${token}`
      },
  }) : req;
  console.log(modifiedReq);
  return next(modifiedReq);
};
