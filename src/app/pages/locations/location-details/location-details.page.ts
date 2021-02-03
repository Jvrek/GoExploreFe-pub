import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController
} from '@ionic/angular';
import { mergeMap, tap } from 'rxjs/operators';
import { FileUploaderComponent } from 'src/app/shared/file-uploader/file-uploader.component';
import { FileUploaderService } from 'src/app/shared/file-uploader/file-uploader.service';
import { ILocation, ILocationImage } from 'src/app/shared/location/ILocation';
import { ViewType } from 'src/app/shared/viewType/view-type.enum';
import { LocationDetailsService } from './location-details.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.page.html',
  styleUrls: ['./location-details.page.scss']
})
export class LocationDetailsPage
  extends FileUploaderComponent
  implements OnInit {
  private viewType: ViewType;
  private id: string = '';

  form: FormGroup;
  location: ILocation;
  isAddedMarker: boolean = false;
  activityTypes: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private locationDetailsService: LocationDetailsService,
    private formBulider: FormBuilder,
    uploadService: FileUploaderService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {
    super(uploadService);
    this.locationDetailsService.getActivityTypes().subscribe((res) => {
      this.activityTypes = res;
    });
  }

  ngOnInit() {
    this.initViewData();
    this.initForm();
    this.loadData(this.id);
  }
  private initViewData() {
    this.viewType = this.activatedRoute.snapshot.paramMap.get(
      'viewType'
    ) as ViewType;
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }
  private async loadData(id: string) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.locationDetailsService
      .getLocation(id)
      .pipe(
        mergeMap((data) => {
          this.location = data;
          this.initForm(this.location);
          return this.loadImages(this.location.id);
        })
      )
      .subscribe(
        () => {},
        async (err) => {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Nie udało się pobrac lokacji',
            message: err.error.error,
            buttons: ['OK']
          });
          await alert.present();
        },
        async () => {
          await loading.dismiss();
        }
      );
  }
  private initForm(data?: ILocation) {
    if (data) {
      this.form.patchValue(data);
    } else {
      this.form = this.formBulider.group({
        name: [
          '',
          [
            Validators.required,
            Validators.maxLength(20),
            Validators.minLength(3)
          ]
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
  }

  get f() {
    return this.form.controls;
  }

  onPutMarker(event: google.maps.Marker) {
    this.isAddedMarker = true;
    this.location.latLng = event.getPosition().toJSON();
  }

  private updateLocationWithImages(id) {
    this.uploadFiles(id)
      .pipe(
        mergeMap(() => {
          return this.downloadFiles(id);
        }),
        mergeMap((res: ILocationImage[]) => {
          this.location.images = res as ILocationImage[];
          return this.locationDetailsService.updateLocation(this.location, id);
        })
      )
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err),
        () => console.log('location add success!')
      );
  }

  async submit() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.location.name = this.f.name.value;
    this.location.description = this.f.description.value;
    this.location.avgCost = +this.f.avgCost.value;
    this.location.maxPeoples = +this.f.maxPeoples.value;
    this.location.activityType = this.f.activityType.value;

    this.locationDetailsService
      .updateLocation(this.location, this.id)
      .subscribe(
        async (resp) => {
          const alert = await this.alertController.create({
            header: 'Informacja',
            message: resp,
            buttons: ['OK']
          });
          await alert.present();
        },
        async (err) => {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Nie udało się zapisać zmian',
            message: err.error.error,
            buttons: ['OK']
          });
          await alert.present();
        },
        async () => {
          await loading.dismiss();
        }
      );
  }

  async delete() {
    const alert = await this.alertController.create({
      header: 'Informacja',
      message: '<strong>Czy na pewno usunąć lokacje?</strong>',
      buttons: [
        {
          text: 'Anuluj',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async () => {
            console.log('anulowano');
          }
        },
        {
          text: 'Usuń',
          handler: async () => {
            this.deleteLocation(this.id);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteLocation(id) {
    const loading = await this.loadingController.create();
    await loading.present();

    this.locationDetailsService.deleteLocation(id).subscribe(
      async (resp) => {
        const alert = await this.alertController.create({
          header: 'Informacja',
          message: resp,
          buttons: [
            {
              text: 'Ok',
              role: 'ok',
              cssClass: 'secondary',
              handler: async () => {
                this.navCtrl.back();
              }
            }
          ]
        });
        await alert.present();
      },
      async (err) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Operacja nie powiodła się',
          message: err.error.error,
          buttons: ['OK']
        });
        await alert.present();
      },
      async () => {
        await loading.dismiss();
      }
    );
  }

  private loadImages(id: string) {
    return this.downloadFiles(id);
  }
}
