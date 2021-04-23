import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTable} from '@angular/material/table';
import {DialogBoxComponent} from './dialog-box/dialog-box.component';
import {EditCategoriesService} from './edit-categories.service';
import {CategoryModel} from '../../model/category-model';

export interface PeriodicElement {
  mainCategory: string;
  subCategory: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {mainCategory: 'Hydrogen', subCategory: 'H'},
//   {mainCategory: 'Helium', subCategory: 'He'},
//   {mainCategory: 'Lithium', subCategory: 'Li'},
//   {mainCategory: 'Beryllium', subCategory: 'Be'},
//   {mainCategory: 'Boron', subCategory: 'B'},
//   {mainCategory: 'Carbon', subCategory: 'C'},
//   {mainCategory: 'Nitrogen', subCategory: 'N'},
//   {mainCategory: 'Oxygen', subCategory: 'O'},
//   {mainCategory: 'Fluorine', subCategory: 'F'},
//   {mainCategory: 'Neon', subCategory: 'Ne'}
// ];

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css']
})

export class EditCategoriesComponent implements OnInit {

  displayedColumns: string[] = ['mainCategory', 'subCategory', 'action'];
  dataSource: CategoryModel[];

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(public dialog: MatDialog,
              private editCategoriesService: EditCategoriesService
  ) {
    console.log('constructor');
  }


  ngOnInit(): void {
    this.loadCategories();
    console.log('init');
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
        this.addRowData(result.data);
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

  addRowData(rowObj): void {
    this.editCategoriesService.addCategories(rowObj.mainCategory, rowObj.subCategory).subscribe(data => {
      this.dataSource = data;
      console.log(data);
    });
  }

  updateRowData(rowObj): void {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === rowObj.id) {
        value.mainCategory = rowObj.mainCategory;
        value.subCategory = rowObj.subCategory;
      }
      return true;
    });
    this.editCategoriesService.updateCategories(rowObj.id, rowObj.mainCategory, rowObj.subCategory).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  deleteRowData(rowObj): void {
    this.editCategoriesService.deleteCategories(rowObj.id).subscribe(data => {
    }, error => {
      console.log(error);
      this.dataSource = this.dataSource.filter((value, key) => {
        return value.id !== rowObj.id;
      });
    });
  }

}
