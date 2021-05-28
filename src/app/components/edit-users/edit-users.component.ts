import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../edit-user/user.service';
import {Subscription} from 'rxjs';
import {UserModel} from '../../model/UserModel';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  displayedColumns: string[] = ['userId', 'userCreated', 'userFirstName', 'userLastName', 'userEmail', 'userRole', 'actions'];
  dataSource: UserModel[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private confirmationDialogService: ConfirmationDialogService
  ) {
  }

  ngOnInit(): void {
    this.dataSource = this.activatedRoute.snapshot.data.Users;
  }

  editUser(user): void {
    this.router.navigateByUrl(this.userService.getFirstNameFromSessionStorage() + '/edit-user/' + user.id);
  }

  openConfirmationDialog(userId: number): void {
    this.confirmationDialogService.confirm('Please confirm action', 'Do you really want to delete user ID: ' + userId + ' ?')
      .then((confirmed) => {
        if (confirmed) {
          this.subscription.add(
            this.userService.deleteUserById(userId).subscribe(data => {
            }, error => {
              console.log(error);
              if (error.status === 200) {
                this.dataSource = this.dataSource.filter(userData => userData.id !== userId);
              }
            })
          );
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
