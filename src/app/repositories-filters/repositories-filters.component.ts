import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Filters {
  search?: string
  isForked: boolean
  hasOpenIssues: boolean
  orderBy?: {attr: string,
            order: 'asc' | 'desc'}
}

@Component({
  selector: 'app-repositories-filters',
  templateUrl: './repositories-filters.component.html',
  styleUrls: ['./repositories-filters.component.scss']
})
export class RepositoriesFiltersComponent implements OnInit {
  @Output() filterChangeEvent = new EventEmitter<Filters>()
  constructor() { }

  ngOnInit(): void {
  }

  onFormChange(f: NgForm) {
    const { forked, openIssues, orderBy, search } = f.value;
    console.log('>', orderBy)
    this.filterChangeEvent.emit({
      search,
      isForked: forked,
      hasOpenIssues: openIssues,
      orderBy: orderBy ? {attr: orderBy.split('-')[0],
                          order: orderBy.split('-')[1]} : undefined,
    })
  }

}
