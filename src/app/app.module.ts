import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentModule } from './component/component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderInterceptor } from './core/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentModule    
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
