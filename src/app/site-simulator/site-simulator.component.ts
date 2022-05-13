import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  templateUrl: './site-simulator.component.html',
  styleUrls: ['./site-simulator.component.scss']
})
export class SiteSimulatorComponent implements OnInit {
  public siteData: ReadonlyArray<string[]> | undefined;

  constructor(private readonly router: Router,) {
    const site = this.router.getCurrentNavigation()?.extras.state;

    if (site) {
      this.siteData = site['data'];
    }
  }

  public ngOnInit(): void {
    if (!this.siteData) {
      this.router.navigate(['/']).catch(console.log);
    }
  }
}
