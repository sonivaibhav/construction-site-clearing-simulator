import {NgRedux} from '@angular-redux/store';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {ConstructionSiteState, ExpenseReport, VehicleHistory} from '../app.interface';
import {destroySiteSimulator} from '../store/simulator.actions';
import {costs} from '../utils/constants';

@Component({
  selector: 'expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss']
})
export class ExpenseReportComponent {
  private readonly siteState: ConstructionSiteState;

  constructor(private readonly router: Router,
              private readonly toastrService: ToastrService,
              private readonly ngRedux: NgRedux<ConstructionSiteState>) {
    this.siteState = this.ngRedux.getState();
    this.toastrService.error(this.siteState.error, 'Simulation Ended!!');
  }

  public finalCostForSiteClearing() {
    return this.rows().reduce((a, b) => a + (b['cost'] || 0), 0);
  }

  public commandHistory(): string | undefined {
    if (this.siteState.vehicleHistory.length <= 0) {
      return;
    }
    let allCommands: string[] = [];
    this.siteState.vehicleHistory.forEach((history: VehicleHistory) => {
      allCommands.push(history.command);
    })

    return allCommands.join(' --> ');
  }

  public rows(): ExpenseReport[] {
    return [
      {
        item: 'Communication overhead',
        quantity: this.siteState.transactionalCost,
        cost: this.siteState.transactionalCost * costs['transaction']
      },
      {
        item: 'Fuel usage',
        quantity: this.siteState.fuelUsage,
        cost: this.siteState.fuelUsage * costs['fuelPerSq']
      },
      this.protectedTreeDamagesCost(),
      this.countUnclearedSquares(),
      this.calcDamageCost()
    ];
  }

  public restartSimulator(): void {
    this.router.navigateByUrl('/').catch(console.error);
    this.ngRedux.dispatch(destroySiteSimulator('destroy'));
  }

  private countUnclearedSquares(): ExpenseReport {
    let unclearedCells: string[] = [];
    this.siteState.site.forEach((row: string[]) => {
      unclearedCells = unclearedCells.concat(row.filter((col: string) => {
        return ['r', 't'].includes(col);
      }))
    });
    return {
      quantity: unclearedCells.length,
      cost: unclearedCells.length * costs['unclearedPerSq'],
      item: 'Uncleared squares'
    }
  }

  private calcDamageCost(): ExpenseReport {
    return {
      quantity: this.siteState.bulldozer.damage,
      cost: this.siteState.bulldozer.damage * costs['damage'],
      item: 'Damage cost'
    }
  }

  private protectedTreeDamagesCost(): ExpenseReport {
    if (this.siteState.isProtectedTree) {
      return {
        quantity: 1,
        cost: costs['protectedTreeDamage'],
        item: 'Protected tree destroyed'
      }
    } else {
      return {
        quantity: 0,
        cost: 0,
        item: 'Protected tree destroyed'
      }
    }
  }
}
