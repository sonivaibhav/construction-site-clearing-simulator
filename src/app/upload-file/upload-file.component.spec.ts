import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UploadFileComponent} from './upload-file.component';

describe('UploadFileComponent', () => {
  let component: UploadFileComponent;
  let fixture: ComponentFixture<UploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadFileComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create UploadFileComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render header', () => {
    const fixture = TestBed.createComponent(UploadFileComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.wrapper h1')?.textContent).toContain('Upload site map');
  });
});
