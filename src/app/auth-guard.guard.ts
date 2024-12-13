import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserServiceService } from './services/user-service.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserServiceService);
  console.log(userService.isLoggedIn());
  return userService.isLoggedIn();
};
