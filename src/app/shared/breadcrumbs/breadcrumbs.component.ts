import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

/**
 * Breadcrumbs Component
 */
export class BreadcrumbsComponent implements OnInit {

  // bread crumb items
  @Input()
  breadcrumbItems!: Array<{
    active?: boolean;
    label?: string;
    link?: string;
  }>;

  constructor() { }

  ngOnInit(): void {

  }

}
