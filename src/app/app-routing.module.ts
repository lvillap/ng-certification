import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZipCodesPageComponent } from './weather/pages/zip-codes-page/zip-codes-page.component';

const routes: Routes = [
  { path: "", component: ZipCodesPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
