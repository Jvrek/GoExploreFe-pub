import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { IUser } from 'src/app/shared/user/I-user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit {
  users: IUser[];
  constructor(
    private usersService: UsersService,
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

  doRefresh(event) {
    this.getUsersList().then(() => {
      event.target.complete();
    });
  }
}
