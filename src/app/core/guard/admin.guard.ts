import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication-service/authentication.service";

export const adminGuard: CanActivateFn = () => {
    const authService = inject(AuthenticationService);
    const router = inject(Router)

    if(authService.isAuthenticate()){
        return true;
    }else{
        return router.createUrlTree(['/login'])
    }

}