import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  filterGroup: any;

  constructor(private formBuilder: FormBuilder) {
    this.filterGroup = formBuilder.group({
      filterFrom: ['', [Validators.required]],
      filterTo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

}
