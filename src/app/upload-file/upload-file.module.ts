import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {UploadFileRoutingModule} from './upload-file-routing.module';
import {UploadFileComponent} from './upload-file.component';

@NgModule({
  imports: [
    CommonModule,
    UploadFileRoutingModule
  ],
  declarations: [UploadFileComponent]
})
export class UploadFileModule {
}
