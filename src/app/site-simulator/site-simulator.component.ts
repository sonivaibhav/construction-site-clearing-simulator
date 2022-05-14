import {NgRedux, select} from '@angular-redux/store';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

import {Bulldozer, ConstructionSiteState} from '../app.interface';
import {tableCells, vehicleDirection} from '../utils/constants';

@Component({
  templateUrl: './site-simulator.component.html',
  styleUrls: ['./site-simulator.component.scss']
})
export class SiteSimulatorComponent {
  public readonly tableCells: { [key: string]: { svg: string } } = tableCells;
  public readonly vehicleDirection: {
    [key: string]: {
      angle: number;
      scaleX: number;
      scaleY: number;
    }
  } = vehicleDirection;
  @select('site') public readonly site$: Observable<string[]> | undefined;

  constructor(private readonly router: Router,
              private readonly ngRedux: NgRedux<ConstructionSiteState>) {
    this.site$?.subscribe(val => {
      if (val.length === 0) {
        this.router.navigateByUrl('/').catch(console.error);
      }
    });
  }

  public get bulldozer(): Bulldozer {
    return this.ngRedux.getState().bulldozer;
  }

  public get simulatorEnded(): string | null {
    return this.ngRedux.getState().error;
  }
}
