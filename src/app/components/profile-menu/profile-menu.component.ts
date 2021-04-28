import {Component, OnInit} from '@angular/core';
import {AuthService} from '../login/auth.service';
import {UserService} from '../edit-user/user.service';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import {UserModel} from '../../model/UserModel';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnInit {
  user: UserModel = new UserModel();

  constructor(private authService: AuthService,
              private editUserService: UserService,
              private confirmationDialogService: ConfirmationDialogService,
              private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.user.firstName = this.userService.getFirstNameFromSessionStorage();
    this.user.id = this.userService.getUserIdFromSessionStorage();
    this.user.role = this.userService.getRoleFromSessionStorage();

    this.authService.loggedInEmitterUser.subscribe(userEmitter => this.user = userEmitter);
  }

  openConfirmationDialog(): void {
    this.confirmationDialogService.confirm('Please confirm action', 'Do you really want to delete your account ?')
      .then((confirmed) => this.deleteUser(this.user.id))
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  deleteUser(userId: number): void {
    this.editUserService.deleteUser(userId).subscribe(data => {
    }, error => {
      console.log(error);
      this.authService.logout();
    });
  }
}
