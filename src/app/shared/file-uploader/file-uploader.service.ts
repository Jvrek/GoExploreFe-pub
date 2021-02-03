import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILocationImage } from '../location/ILocation';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {
  private baseUrl = `${environment.baserUrl}${environment.port}/api`;

  constructor(private http: HttpClient) {}

  upload(file: File, subPath: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('subPath', subPath);

    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/files/upload`,
      formData,
      {
        reportProgress: true,
        responseType: 'json'
      }
    );

    return this.http.request(req);
  }

  getFiles(path: string): Observable<ILocationImage[]> {
    return this.http.get<ILocationImage[]>(`${this.baseUrl}/files/${path}`);
  }
}
