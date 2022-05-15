import {NgRedux, NgReduxModule} from '@angular-redux/store';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ConstructionSiteState} from './app.interface';
import {NavHeaderComponent} from './nav-header/nav-header.component';
import {simulatorReducer} from './store/simulator.reducer';
import {initialState} from './utils/constants';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgReduxModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<ConstructionSiteState>) {
    // @ts-ignore
    ngRedux.configureStore(simulatorReducer, initialState);
  }
}
