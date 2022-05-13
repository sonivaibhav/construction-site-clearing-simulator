import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavHeaderComponent} from './nav-header/nav-header.component';
import {UploadFileComponent} from './upload-file/upload-file.component';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    UploadFileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
