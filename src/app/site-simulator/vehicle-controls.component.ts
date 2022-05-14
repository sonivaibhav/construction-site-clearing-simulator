import {Component} from '@angular/core';

@Component({
  selector: 'vehicle-controls',
  templateUrl: './vehicle-controls.component.html',
  styleUrls: ['./vehicle-controls.component.scss']
})
export class VehicleControlsComponent {

  public advanceVehicle(): void {
    console.log('advanceVehicle');
  }

  public turnVehicleLeft(): void {
    console.log('turnVehicleLeft');
  }

  public turnVehicleRight(): void {
    console.log('turnVehicleRight');
  }

  public quitSimulation(): void {
    console.log('quitSimulation');
  }
}
