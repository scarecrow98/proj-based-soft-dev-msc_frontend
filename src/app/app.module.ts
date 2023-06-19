import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CdsModule } from '@cds/angular';
import { ClarityModule } from '@clr/angular';

import { ClarityIcons, uploadCloudIcon, barChartIcon, logoutIcon, userIcon, windowCloseIcon } from '@cds/core/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './core/interceptors/request.interceptor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ClarityModule,
    CdsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: RequestInterceptor
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    ClarityIcons.addIcons(uploadCloudIcon);
    ClarityIcons.addIcons(logoutIcon);
    ClarityIcons.addIcons(barChartIcon);
    ClarityIcons.addIcons(userIcon);
    ClarityIcons.addIcons(windowCloseIcon);
  }
}
