import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { FileUploaderService } from './file-uploader.service';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  isValidFileExtension: boolean = false;
  fileInfos: Observable<any>;

  constructor(private uploadService: FileUploaderService) {}

  ngOnInit() {}

  selectFiles(event): void {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.isValidFileExtension = this.requiredFileType(this.selectedFiles);
  }

  removeSelectedFiles() {
    this.progressInfos = [];
    this.isValidFileExtension = false;
  }

  uploadFiles(subPath: string) {
    this.message = '';
    let observableBatch = [];
    for (let i = 0; i < this.selectedFiles.length; i++) {
      observableBatch.push(this.upload(i, this.selectedFiles[i], subPath));
    }
    return forkJoin(observableBatch);
  }
  upload(idx, file, subPath) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    return this.uploadService.upload(file, subPath).pipe(
      tap((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(
            (100 * event.loaded) / event.total
          );
        }
      }),
      catchError((err) => {
        this.progressInfos[idx].value = 0;
        this.message = 'Nie udało się dodać zdjęć:' + file.name;
        return err;
      })
    );
  }

  downloadFiles(path: string) {
    return (this.fileInfos = this.uploadService.getFiles(path));
  }

  private requiredFileType(
    files: FileList,
    requiredTypes: string[] = ['png', 'jpg']
  ): boolean {
    for (const key in files) {
      if (Object.prototype.hasOwnProperty.call(files, key)) {
        const element = files[key];
        const extension = element.name.split('.')[1].toLowerCase();
        if (!(requiredTypes.indexOf(extension) > -1)) {
          this.selectedFiles = files = null;
          this.message = 'Niewłaściwy format pliku, wymagane:' + requiredTypes;
          return false;
        }
      }
    }
    this.message = '';
    return true;
  }
}
