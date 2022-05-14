import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {UploadFileComponent} from './upload-file.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ToastrModule, ToastrService} from "ngx-toastr";

describe('UploadFileComponent', () => {
  let component: UploadFileComponent;
  let fixture: ComponentFixture<UploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadFileComponent],
      imports: [RouterTestingModule, ToastrModule.forRoot()],
      providers: [ToastrService]
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

  it('should validate that first cell never have protected tree', fakeAsync(() => {
    const protectedTreeOnFirstCell = `Totooooooo
                                      rroooooToo
                                      TrrooooToo
                                      rrrroooooo
                                      rrrrrtoooo`;
    // @ts-ignore
    component.validateSiteMapFile(protectedTreeOnFirstCell);
    fixture.detectChanges();

    // @ts-ignore
    expect(component.validateSiteMapFile(protectedTreeOnFirstCell, 'txt').isValid).toEqual(false);
    // @ts-ignore
    expect(component.validateSiteMapFile(protectedTreeOnFirstCell, 'txt').errorMessage).toEqual('Validation error on line 0 column 0, first cell can not have protected tree');
  }));

  it('should validate site map is invalid due to unequal dimensions', fakeAsync(() => {
    const unequalLengthInputFile = `ootooooooo
                                    ToooooooToo
                                    TrrrooooToo
                                    rrrroooooo
                                    rrtoooo`;
    // @ts-ignore
    component.validateSiteMapFile(unequalLengthInputFile);
    fixture.detectChanges();

    // @ts-ignore
    expect(component.validateSiteMapFile(unequalLengthInputFile, 'txt').isValid).toEqual(false);
    // @ts-ignore
    expect(component.validateSiteMapFile(unequalLengthInputFile, 'txt').errorMessage).toEqual('Validation error on line 1, length is not matching. Each rows should have equal length');
  }));

  it('should validate invalid characters in uploaded file', fakeAsync(() => {
    const inValidCharsInputFile = `ootooooooo
                                   rroooooToo
                                   errooooToo
                                   rrrroooooo
                                   rrrrrtoooo`;
    // @ts-ignore
    component.validateSiteMapFile(inValidCharsInputFile);
    fixture.detectChanges();

    // @ts-ignore
    expect(component.validateSiteMapFile(inValidCharsInputFile, 'txt').isValid).toEqual(false);
    // @ts-ignore
    expect(component.validateSiteMapFile(inValidCharsInputFile, 'txt').errorMessage).toEqual('Validation error on line 2, e is not a valid character');
  }));

  it('should validate site map without errors', fakeAsync(() => {
    const validInputFile = `ootooooooo
                            rroooooToo
                            rrrooooToo
                            rrrroooooo
                            rrrrrtoooo`;
    // @ts-ignore
    component.validateSiteMapFile(validInputFile);
    fixture.detectChanges();

    // @ts-ignore
    expect(component.validateSiteMapFile(validInputFile, 'txt').isValid).toEqual(true);
  }));

  it('should call selectSiteMap', fakeAsync(() => {
    spyOn(component, 'selectSiteMap');
    // @ts-ignore
    component.selectSiteMap();
    fixture.detectChanges();

    // @ts-ignore
    expect(component.selectSiteMap).toHaveBeenCalled();
  }));
});
