import {Component, OnInit} from '@angular/core';
import {PaginationService} from './pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  config: any;
  collection = {count: 60, data: []};

  ngOnInit(): void {
  }

  constructor(private paginationService: PaginationService) {

    // Create dummy data
    for (let i = 0; i < this.collection.count; i++) {
      this.collection.data.push(
        {
          id: i + 1,
          value: 'items number ' + (i + 1)
        }
      );
    }

    this.config = {
      itemsPerPage: 3,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  pageChanged(event): void {
    this.config.currentPage = event;
    const currentPage = this.config.currentPage;
    console.log(currentPage);
    this.paginationService.pageChanging(currentPage);
  }

}
