import {Component, ElementRef, ViewChild} from '@angular/core';

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
  }

}
