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
  selector: 'app-pulls-filters',
  templateUrl: './pulls-filters.component.html',
  styleUrls: ['./pulls-filters.component.scss']
})
export class PullsFiltersComponent implements OnInit {
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
