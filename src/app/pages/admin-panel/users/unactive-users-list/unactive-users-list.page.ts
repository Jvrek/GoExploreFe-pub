import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { IUser } from 'src/app/shared/user/I-user';
import { UsersUnactiveListService } from './unactive-users-list.service';

@Component({
  selector: 'app-unactive-users-list',
  templateUrl: './unactive-users-list.page.html',
  styleUrls: ['./unactive-users-list.page.scss']
})
export class UsersUnactiveListPage implements OnInit {
  users: IUser[];
  constructor(
    private usersService: UsersUnactiveListService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getUsersList();
  }

  private async getUsersList() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.usersService.getAllUsers().subscribe(
      async (res) => {
        await loading.dismiss();
        this.users = res;
      },
      async (err) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Nie udało się pobrac listy lokacji',
          message: err.error.error,
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  async activate(id) {
    const alert = await this.alertController.create({
      header: 'Informacja',
      message: '<strong>Aktywować konto?</strong>',
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
          text: 'Aktywuj',
          handler: async () => {
            const loading = await this.loadingController.create();
            await loading.present();
            this.usersService.activateUser(id).subscribe(
              async (res) => {
                await loading.dismiss();
                this.getUsersList();
              },
              async (err) => {
                await loading.dismiss();
                const alert = await this.alertController.create({
                  header: 'Nie udało się aktywowac konta',
                  buttons: ['OK']
                });
                await alert.present();
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  doRefresh(event) {
    this.getUsersList().then(() => {
      event.target.complete();
    });
  }
}
