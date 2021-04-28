import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTable} from '@angular/material/table';
import {DialogBoxComponent} from './dialog-box/dialog-box.component';
import {EditCategoriesService} from './edit-categories.service';
import {MainCategoryModel} from '../../model/main-category-model';
import {MessengerService} from '../../messengers/messenger.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css']
})

export class EditCategoriesComponent implements OnInit {

  displayedColumns: string[] = ['mainCategory', 'subCategory', 'actionMainCategory'];
  innerDisplayedColumns: string[] = ['subCategory', 'actionSubCategory'];
  dataSource: MainCategoryModel[];

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private dialog: MatDialog,
              private editCategoriesService: EditCategoriesService,
              private messengerService: MessengerService
  ) {
  }


  ngOnInit(): void {
    this.loadCategories();
  }

  openDialog(action, obj): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      height: '250px',
      width: '300px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addMainCategory(result.data);
      } else if (result.event === 'AddSub') {
        this.addSubCategory(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  loadCategories(): void {
    this.editCategoriesService.getCategories().subscribe(data => {
      this.dataSource = data;
    });
  }

  addMainCategory(rowObj): void {
    this.editCategoriesService.addMainCategory(rowObj.mainCategory).subscribe(data => {
    }, error => {
      this.loadCategories();
      console.log(error);
      this.messengerService.sendMessageAddCategory();
    });
  }

  addSubCategory(rowObj): void {
    this.editCategoriesService.addSubCategory(rowObj.id, rowObj.subCategories.subCategory).subscribe(data => {
      this.dataSource = data;
      this.messengerService.sendMessageAddCategory();
    });
  }

  updateRowData(rowObj): void {
    if (rowObj.mainCategory) {
      this.dataSource = this.dataSource.filter((value, key) => {
        if (value.id === rowObj.id) {
          value.mainCategory = rowObj.mainCategory;
        }
        return true;
      });

      this.editCategoriesService.updateMainCategory(rowObj.id, rowObj.mainCategory).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
    }

    if (rowObj.subCategory) {

      this.dataSource.forEach(value => {
        value.subCategories.filter(value1 => {
          if (value1.id === rowObj.id) {
            value1.subCategory = rowObj.subCategory;
          }
        });
      });

      this.editCategoriesService.updateSubCategory(rowObj.id, rowObj.subCategory).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
    }
  }

  deleteRowData(rowObj): void {

    if (rowObj.mainCategory) {
      this.editCategoriesService.deleteMainCategory(rowObj.id).subscribe(data => {
      }, error => {
        console.log(error);
        this.dataSource = this.dataSource.filter((value, key) => {
          return value.id !== rowObj.id;
        });
      });
    }

    if (rowObj.subCategory) {
      this.editCategoriesService.deleteSubCategory(rowObj.id).subscribe(data => {
        }, error => {
          console.log(error);
          this.loadCategories();
        }
      );
    }
  }
}
