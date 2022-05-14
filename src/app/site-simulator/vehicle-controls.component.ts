import {NgRedux} from '@angular-redux/store';
import {Component} from '@angular/core';
import {Bulldozer, ConstructionSiteState, Direction, ValidateBulldozerPosition} from '../app.interface';
import {
  protectedTreeFound,
  updateFuelUsage,
  updateSiteSimulator,
  updateVehicleLocation,
  vehicleError
} from '../store/simulator.actions';
import {tableCells} from '../utils/constants';

@Component({
  selector: 'vehicle-controls',
  templateUrl: './vehicle-controls.component.html',
  styleUrls: ['./vehicle-controls.component.scss']
})
export class VehicleControlsComponent {
  private readonly siteState: ConstructionSiteState;

  constructor(private readonly ngRedux: NgRedux<ConstructionSiteState>) {
    this.siteState = this.ngRedux.getState();
  }

  public advanceVehicle(args: string[]): void {
    const value = args[1] ? args[1] : null;
    const ifBulldozerIsOnSite = this.validateIfBulldozerIsOnSite(this.siteState.site, {...this.siteState.bulldozer}, Number(value));
    if (ifBulldozerIsOnSite.valid) {
      // calculate fuel
      const fuelConsumptionAndUpdateGrid = this.fuelConsumptionAndUpdateGrid(this.siteState.site, ifBulldozerIsOnSite.bulldozer, Number(value));

      // update location
      this.ngRedux.dispatch(updateVehicleLocation(ifBulldozerIsOnSite.bulldozer, `Advance ${args[1]} square`));
      // update grid
      this.ngRedux.dispatch(updateSiteSimulator(fuelConsumptionAndUpdateGrid.site));
      // update fuel
      this.ngRedux.dispatch(updateFuelUsage(fuelConsumptionAndUpdateGrid.fuelUsage));

    } else {
      // update location
      this.ngRedux.dispatch(updateVehicleLocation(ifBulldozerIsOnSite.bulldozer, `Advance ${args[1]} square`));
      this.ngRedux.dispatch(vehicleError(ifBulldozerIsOnSite.error));
      if (ifBulldozerIsOnSite.isProtectedTree) {
        this.ngRedux.dispatch(protectedTreeFound(ifBulldozerIsOnSite.isProtectedTree));
      }

      // TODO: Show error message and quite simulation
    }
  }

  public turnVehicleLeft(): void {
    switch (this.siteState.bulldozer.facing) {
      case Direction.EAST:
        this.siteState.bulldozer.facing = Direction.NORTH;
        break;
      case Direction.NORTH:
        this.siteState.bulldozer.facing = Direction.WEST;
        break;
      case Direction.WEST:
        this.siteState.bulldozer.facing = Direction.SOUTH;
        break;
      case Direction.SOUTH:
        this.siteState.bulldozer.facing = Direction.EAST;
        break;
      default:
        this.siteState.bulldozer.facing = Direction.EAST;
    }

    this.ngRedux.dispatch(updateVehicleLocation({...this.siteState.bulldozer}, 'Left turn'));
  }

  public turnVehicleRight(): void {
    switch (this.siteState.bulldozer.facing) {
      case Direction.EAST:
        this.siteState.bulldozer.facing = Direction.SOUTH;
        break;
      case Direction.SOUTH:
        this.siteState.bulldozer.facing = Direction.WEST;
        break;
      case Direction.WEST:
        this.siteState.bulldozer.facing = Direction.NORTH;
        break;
      case Direction.NORTH:
        this.siteState.bulldozer.facing = Direction.EAST;
        break;
      default:
        this.siteState.bulldozer.facing = Direction.EAST;
    }
    this.ngRedux.dispatch(updateVehicleLocation({...this.siteState.bulldozer}, 'Right turn'));
  }

  public quitSimulation(): void {
    this.ngRedux.dispatch(updateVehicleLocation(this.siteState.bulldozer, 'Quit'));
    this.ngRedux.dispatch(vehicleError('The trainee presses the quit button.'));
    console.log(this.ngRedux.getState());
  }

  private fuelConsumptionAndUpdateGrid = (site: string[][], bulldozer: Bulldozer, squarePosition: number): {
    fuelUsage: number;
    site: string[][]
  } => {
    let transaction = {
      fuelUsage: squarePosition - 1, // exclude cell to be moved to avoid doubling
      site: [...site]
    };

    transaction.fuelUsage += tableCells[site[bulldozer.yPos][bulldozer.xPos]].fuelUsage;
    if (site[bulldozer.yPos][bulldozer.xPos] === 'r') {
      transaction.site[bulldozer.yPos][bulldozer.xPos] = 'o';
    } else if (site[bulldozer.yPos][bulldozer.xPos] === 't') {
      transaction.site[bulldozer.yPos][bulldozer.xPos] = 'o';
    }

    return transaction;
  }

  private validateIfBulldozerIsOnSite(grid: string[][], prevLocation: Bulldozer, squarePosition: number): ValidateBulldozerPosition {
    const bulldozerPosition = {...prevLocation}
    const gridSize = {x: grid[0].length, y: grid.length};

    let gridsBetween: string[] = [];
    if (bulldozerPosition.facing === Direction.EAST) {
      bulldozerPosition.yPos = bulldozerPosition.yPos === -1 ? bulldozerPosition.yPos + 1 : bulldozerPosition.yPos;
      bulldozerPosition.xPos = bulldozerPosition.xPos + squarePosition;
      gridsBetween = this.simulatePassingThrough(grid, prevLocation.xPos, bulldozerPosition.xPos, 'x', bulldozerPosition.yPos);
    } else if (bulldozerPosition.facing === Direction.WEST) {
      bulldozerPosition.xPos = bulldozerPosition.xPos - squarePosition;
      gridsBetween = this.simulatePassingThrough(grid, prevLocation.xPos, bulldozerPosition.xPos, 'x', bulldozerPosition.yPos);
    } else if (bulldozerPosition.facing === Direction.NORTH) {
      bulldozerPosition.yPos = bulldozerPosition.yPos - squarePosition;
      gridsBetween = this.simulatePassingThrough(grid, prevLocation.yPos, bulldozerPosition.yPos, 'y', bulldozerPosition.xPos);
    } else if (bulldozerPosition.facing === Direction.SOUTH) {
      bulldozerPosition.yPos = bulldozerPosition.yPos + squarePosition;
      gridsBetween = this.simulatePassingThrough(grid, prevLocation.yPos, bulldozerPosition.yPos, 'y', bulldozerPosition.xPos);
    }

    if (bulldozerPosition.xPos > -1 && bulldozerPosition.yPos > -1 && bulldozerPosition.xPos < gridSize.x && bulldozerPosition.yPos < gridSize.y) {
      if (gridsBetween && gridsBetween.length > 0 && gridsBetween.includes('T')) {
        return {
          valid: false,
          bulldozer: bulldozerPosition,
          error: 'There is an attempt to remove a tree that is protected',
          end: true,
          isProtectedTree: true
        };

      } else {
        if (gridsBetween && gridsBetween.length > 0 && squarePosition > 1) {
          // remove the new cell the bulldozer is supposed to be in after this transaction
          gridsBetween.splice(-1, 1)
          bulldozerPosition.damage += gridsBetween.filter(grid => grid === 't' || grid === 'r').length;
        }
        return {
          valid: true,
          bulldozer: bulldozerPosition,
          error: null,
          end: false,
          isProtectedTree: false
        };
      }

    }

    return {
      valid: false,
      bulldozer: prevLocation,
      error: 'There is an attempt to navigate beyond the boundaries of the site',
      end: true,
      isProtectedTree: false
    };
  }

  private simulatePassingThrough(grid: string[][], startPos: number, end: number, direction: string, fixedPos: number): string[] {

    // simulate passing through squares
    const gridsBetween: string[] = [];
    if (end >= startPos) {
      const i = startPos > 0 ? startPos : 1;
      for (let start = i; start <= end; start++) {
        this.navigateThroughGrid(direction, grid, fixedPos, start, gridsBetween);
      }
    } else {
      for (let start = startPos; start >= end; start--) {
        this.navigateThroughGrid(direction, grid, fixedPos, start, gridsBetween);
      }
    }
    return gridsBetween;
  }

  private navigateThroughGrid(direction: string, grid: string[][], fixedPos: number, start: number, gridsBetween: any[]): void {
    if (direction === 'x' && grid[fixedPos] && grid[fixedPos][start]) {
      gridsBetween.push(grid[fixedPos][start]);
    } else if (direction === 'y' && grid[start] && grid[start][fixedPos]) {
      gridsBetween.push(grid[start][fixedPos]);
    }
  }
}
