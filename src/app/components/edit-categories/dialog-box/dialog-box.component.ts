import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MainCategoryModel} from '../../../model/main-category-model';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  action: string;
  categories: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: MainCategoryModel) {
    console.log(data);
    this.categories = {...data};
    this.action = this.categories.action;
  }

  ngOnInit(): void {
  }

  doAction(): void {
    this.dialogRef.close({event: this.action, data: this.categories});
  }

  closeDialog(): void {
    this.dialogRef.close({event: 'Cancel'});
  }
}
