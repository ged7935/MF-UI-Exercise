import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export { User } from './model/user.model';
export { UsersFacade } from './facade/users.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule { 
}
