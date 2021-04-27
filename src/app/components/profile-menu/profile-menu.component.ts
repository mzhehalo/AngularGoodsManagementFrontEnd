import {Component, OnInit} from '@angular/core';
import {AuthService} from '../login/auth.service';
import {EditUserService} from '../edit-user/edit-user.service';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnInit {
  user: string;
  role: string;

  constructor(private authService: AuthService,
              private editUserService: EditUserService,
              private confirmationDialogService: ConfirmationDialogService
  ) {
  }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('FirstName');
    this.role = sessionStorage.getItem('ROLE');
    this.authService.loggedInEmitterUserFirstName.subscribe(firstName => {
      this.user = firstName;
      console.log(firstName);
    }, error => {
      console.log(error);
    });
  }

  openConfirmationDialog(): void {
    const userId = Number(sessionStorage.getItem('ID'));

    this.confirmationDialogService.confirm('Please confirm action', 'Do you really want to delete your account ?')
      .then((confirmed) => this.deleteUser(userId))
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
