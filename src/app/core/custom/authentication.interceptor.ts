import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    
    const router = inject(Router)
    const token = sessionStorage.getItem("token");

    if (req.url.includes("auth")) return next(req);

    if(token){
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(req).pipe(
        catchError(error => {
            if(error.status === 401 || error.status === 403){
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("role");
                router.navigate(['/navigate']);
            }

            return throwError(() => error);
        })
    )
}