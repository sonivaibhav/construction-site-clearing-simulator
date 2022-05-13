import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadFileComponent} from "./upload-file.component";
import {UploadFileRoutingModule} from "./upload-file-routing.module";

@NgModule({
  imports: [
    CommonModule,
    UploadFileRoutingModule
  ],
  declarations: [UploadFileComponent]
})
export class UploadFileModule {
}
