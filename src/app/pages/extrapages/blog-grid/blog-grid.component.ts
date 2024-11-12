import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

import { news, blogs } from './blog-grid.model';
import { newsData, blogsData } from './data';
import { BlogGridService } from './blog-grid.service';
import { NgbdBlogGridSortableHeader, SortEvent } from './blog-grid-sortable.directive';

@Component({
  selector: 'app-blog-grid',
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.scss'],
  providers: [BlogGridService, DecimalPipe]
})

/**
 * BlogGrid Component
 */
export class BlogGridComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  newsData!: news[];
  blogsData!: blogs[];
  term:any;

   // Table data
   OrdersList$!: Observable<blogs[]>;
   total$: Observable<number>;
   @ViewChildren(NgbdBlogGridSortableHeader) headers!: QueryList<NgbdBlogGridSortableHeader>;

  constructor(public service: BlogGridService) {
    this.OrdersList$ = service.countries$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    /**
   * BreadCrumb
   */
    this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'Blog', active: true }
    ];

    // Data Get Function
    this._fetchData();
  }

  // Data Fetch
  private _fetchData() {
    this.newsData = newsData;
    this.blogsData = blogsData;
    this.blogsDatas = Object.assign([], this.blogsData);
  }

  /**
   * Swiper setting
   */
   config = {
    initialSlide: 0,
    slidesPerView: 1,
    navigation: true
  };

  blogsDatas:any;
  // Category Filter
  CategorySearch(){
    var category = document.getElementById("categories") as HTMLInputElement;
    if (category.value != '') {
      this.blogsDatas = this.blogsData.filter( (data:any) => {
        return data.category === category.value;
      });
    }
    else{
       this.blogsDatas = this.blogsData
    }
  }

  // Sort filter
  sortField:any;
  sortBy:any
  SortFilter(){
    this.sortField = (document.getElementById("sortby") as HTMLInputElement).value;
    if (this.sortField[0] == 'A') {
      this.sortBy = 'desc';
      this.sortField = this.sortField.replace(/A/g, '')
    }
    if (this.sortField[0] == 'D') {
      this.sortBy = 'asc';
      this.sortField = this.sortField.replace(/D/g, '')
    }
  }


}
