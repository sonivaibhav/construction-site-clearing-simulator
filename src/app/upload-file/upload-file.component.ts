import {Component, ElementRef, ViewChild} from '@angular/core';

type FileContent = string | null | undefined | ArrayBuffer;

interface ValidateSiteMap {
  isValid: boolean;
  errorMessage: string;
  siteData: string[][];
}

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
  public fileName: string | undefined;
  @ViewChild('fileUpload') private readonly fileUploadEl: ElementRef | undefined;

  public selectSiteMap(): void {
    const file: File = this.fileUploadEl?.nativeElement.files[0];
    this.fileName = file.name;

    const fileReader = new FileReader();


    fileReader.onloadend = (el: ProgressEvent<FileReader>) => {
      const fileContent = (el.target as FileReader).result;
      const validate = this.validateSiteMapFile(fileContent);

      if (validate.isValid) {
        // TODO: User should navigate to next page if file upload is successful, add routing mechanism
        console.log('File upload success', validate);
      } else {
        // TODO: add alert message or notification service to display error message on screen
        this.errorMsg(validate.errorMessage);
      }
    }

    if (file) {
      fileReader.readAsText(file);
    }
  }

  private validateSiteMapFile(fileContent: FileContent): ValidateSiteMap {
    let isValid = true;
    let errorMessage = '';
    const siteData: string[][] = [];

    if (!this.validateFileExt() || !fileContent) {
      isValid = false;
      errorMessage = "Invalid file format, Please select text file with valid content";
    } else {
      const fileContentRows = (fileContent as string).split("\n");

      // TODO: remove console
      console.log(fileContentRows);
    }

    return {isValid, errorMessage, siteData};
  }

  private validateFileExt(): boolean {
    const file: File = this.fileUploadEl?.nativeElement.files[0];
    return file.type === 'text/plain';
  }

  private errorMsg(message: string): void {
    console.log(message);
  }

}
