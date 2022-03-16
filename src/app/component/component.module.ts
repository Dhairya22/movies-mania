import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    MovieListComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [MovieListComponent, LoaderComponent]
})
export class ComponentModule { }
