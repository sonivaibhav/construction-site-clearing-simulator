import {NgRedux, select} from '@angular-redux/store';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ConstructionSiteState} from '../app.interface';

import {tableCells} from '../utils/constants';

@Component({
  templateUrl: './site-simulator.component.html',
  styleUrls: ['./site-simulator.component.scss']
})
export class SiteSimulatorComponent {
  public tableCells: { [key: string]: { svg: string } } = tableCells

  @select('site') site$: Observable<string[]> | undefined;

  constructor(private readonly router: Router,
              private ngRedux: NgRedux<ConstructionSiteState>) {
    this.site$?.subscribe(val => {
      if (val.length === 0) {
        this.router.navigateByUrl('/').catch(console.error);
      }
    });

    // TODO: Remove console.log
    console.log(this.ngRedux.getState());
  }
}
