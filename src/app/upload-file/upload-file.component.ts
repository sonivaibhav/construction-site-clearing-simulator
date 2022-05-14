import {NgRedux} from '@angular-redux/store';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ConstructionSiteState} from '../app.interface';
import {createSiteSimulator} from '../store/simulator.actions';

type FileContent = string | null | undefined | ArrayBuffer;

interface ValidateSiteMap {
  isValid: boolean;
  errorMessage: string;
  siteData: string[][];
}

@Component({
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
  public fileName: string | undefined;
  @ViewChild('fileUpload') private readonly fileUploadEl: ElementRef | undefined;

  constructor(private readonly router: Router,
              private ngRedux: NgRedux<ConstructionSiteState>,
              private readonly toastrService: ToastrService) {
  }

  public selectSiteMap(): void {
    const file: File = this.fileUploadEl?.nativeElement.files[0];
    this.fileName = file.name;

    const fileReader = new FileReader();


    fileReader.onloadend = (el: ProgressEvent<FileReader>) => {
      const fileContent = (el.target as FileReader).result;
      const fileType = this.fileUploadEl?.nativeElement.files[0].name.split('.').pop();
      const siteMap = this.validateSiteMapFile(fileContent, fileType);

      if (siteMap.isValid) {
        this.ngRedux.dispatch(createSiteSimulator(siteMap.siteData));
        this.router.navigate(['/site-simulator']).catch(console.error);
      } else {
        this.errorMsg(siteMap.errorMessage);
      }
    }

    if (file) {
      fileReader.readAsText(file);
    }
  }

  private validateSiteMapFile(fileContent: FileContent, fileType: string): ValidateSiteMap {
    let isValid = true;
    let errorMessage = '';
    const siteData: string[][] = [];

    if (!(fileType === 'txt') || !fileContent) {
      isValid = false;
      errorMessage = 'Invalid file format, Please select text file with valid content';
    } else {
      const fileContentRows = (fileContent as string).split('\n');

      let length = 0;
      fileContentRows.forEach((row: string, idx: number): void => {
        const fileContentColumns = row.trim().split('');
        if (isValid) {
          if (length === 0 || length === fileContentColumns.length) {
            const protectedTreeFound = this.isProtectedTreeFound(idx, fileContentColumns, errorMessage, isValid);
            errorMessage = protectedTreeFound.errorMessage;
            isValid = protectedTreeFound.isValid;

            const validateCharacters = this.isValidChar(fileContentColumns, ['o', 'r', 't', 'T']);
            if (isValid && validateCharacters && validateCharacters.length > 0) {
              errorMessage = `Validation error on line ${idx}, ${validateCharacters.join(',')} ${validateCharacters.length === 1 ? 'is not a valid character' : 'are not valid characters'}`;
              isValid = false;
            } else {
              siteData[idx] = fileContentColumns;
              length = siteData[idx].length;
            }
          } else {
            errorMessage = `Validation error on line ${idx}, length is not matching. Each rows should have equal length`;
            isValid = false;
          }
        }
      });
      // TODO: remove console
      console.log(fileContentRows);
    }

    return {isValid, errorMessage, siteData};
  }

  private isProtectedTreeFound(idx: number, fileContentColumns: string[], errorMessage: string, isValid: boolean): { isValid: boolean, errorMessage: string } {
    // Protected tree can never be found on first cell
    if (idx === 0 && fileContentColumns[0] === 'T') {
      errorMessage = `Validation error on line ${idx} column 0, first cell can not have protected tree`;
      isValid = false;
    }
    return {errorMessage, isValid};
  }

  private isValidChar(cols: ReadonlyArray<string>, letters: ReadonlyArray<string>): string[] {
    return cols.filter(val => !letters.includes(val));
  }

  private errorMsg(message: string): void {
    this.toastrService.error(message, 'Error!');
  }
}
