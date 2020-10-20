import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { PageComponent } from './components/page/page.component';

@NgModule({
  declarations: [NavbarComponent, PageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    NavbarComponent,
    PageComponent,
  ]
})
export class SharedModule { }
