import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { mergeMap, switchMap } from 'rxjs/operators';
import { FileUploaderComponent } from 'src/app/shared/file-uploader/file-uploader.component';
import { FileUploaderService } from 'src/app/shared/file-uploader/file-uploader.service';
import { ILocation, ILocationImage } from 'src/app/shared/location/ILocation';
import { ISwipeCard } from 'src/app/shared/swipe-cards/ISwipe-card';
import { LocationsAddService } from './locations-add.service';

import * as $ from 'jquery';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-locations-add',
  templateUrl: './locations-add.page.html',
  styleUrls: ['./locations-add.page.scss']
})
export class LocationsAddPage extends FileUploaderComponent implements OnInit {
  form: FormGroup;
  @ViewChild('upload') myDiv: ElementRef<HTMLElement>;

  public cardList: ISwipeCard[] = [];
  addedLocationId: string;
  isAddedMarker: boolean = false;
  activityTypes: any[];

  location: ILocation = {
    name: null,
    description: null,
    images: null,
    latLng: {
      lat: null,
      lng: null
    },
    avgCost: null,
    maxPeoples: null,
    activityType: null,
    ownerId: null
  };

  constructor(
    private formBulider: FormBuilder,
    uploadService: FileUploaderService,
    private locationsAddService: LocationsAddService,
    private userService: UserService
  ) {
    super(uploadService);
    this.locationsAddService.getActivityTypes().subscribe((res) => {
      this.activityTypes = res;
    });
  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.formBulider.group({
      name: [
        '',
        [Validators.required, Validators.maxLength(20), Validators.minLength(3)]
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(120),
          Validators.minLength(5)
        ]
      ],
      avgCost: ['', [Validators.required]],
      maxPeoples: [
        '',
        [Validators.required, Validators.max(5), Validators.min(1)]
      ],
      activityType: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.location.name = this.f.name.value;
    this.location.description = this.f.description.value;
    this.location.avgCost = +this.f.avgCost.value;
    this.location.maxPeoples = +this.f.maxPeoples.value;
    this.location.activityType = this.f.activityType.value;
    this.location.ownerId = this.userService.getUserDetails().id;

    this.locationsAddService.addLocation(this.location).subscribe(
      (locationId) => {
        this.addedLocationId = locationId;
      },
      (err) => console.error(err),
      () => {
        this.updateLocationWithImages(this.addedLocationId);
      }
    );
    this.form.reset();
  }

  private updateLocationWithImages(id) {
    this.uploadFiles(id)
      .pipe(
        mergeMap(() => {
          return this.downloadFiles(id);
        }),
        mergeMap((res: ILocationImage[]) => {
          this.location.images = res as ILocationImage[];
          return this.locationsAddService.updateLocation(this.location, id);
        })
      )
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err),
        () => console.log('location add success!')
      );
  }

  onPutMarker(event: google.maps.Marker) {
    this.isAddedMarker = true;
    this.location.latLng = event.getPosition().toJSON();
  }

  readURL(event) {
    if (event.target && event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      console.log(event.target.files);
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e) => {
        $('.image-upload-wrap').hide();
        $('.file-upload-image').attr('src', e.target.result as string);
        $('.file-upload-content').show();
        //$('.image-title').html(event.target.files[0].name);
      };
    } else {
      this.removeUpload();
    }
  }

  removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
    this.removeSelectedFiles();
  }

  triggerUploadClick() {
    let el: HTMLElement = this.myDiv.nativeElement;
    el.click();
  }

  doRefresh(event) {
    this.initializeForm();
    event.target.complete();
  }
}
