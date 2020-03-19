import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './component/banner/banner.component';
import { UserModule } from '../user/user.module';
export { AuthService } from './service/auth.service'

@NgModule({
  declarations: [BannerComponent],
  imports: [
    CommonModule,
    UserModule
  ],
  exports: [BannerComponent]
})
export class CoreModule { }
