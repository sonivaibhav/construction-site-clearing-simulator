import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavHeaderComponent} from './nav-header.component';

describe('NavHeaderComponent', () => {
  let component: NavHeaderComponent;
  let fixture: ComponentFixture<NavHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavHeaderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create NavHeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'construction site clearing simulator'`, () => {
    const fixture = TestBed.createComponent(NavHeaderComponent);
    const nav = fixture.componentInstance;
    expect(nav.title).toEqual('construction site clearing simulator');
  });

  it('should render nav header', () => {
    const fixture = TestBed.createComponent(NavHeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.toolbar span')?.textContent).toContain('Construction Site Clearing Simulator');
  });
});
