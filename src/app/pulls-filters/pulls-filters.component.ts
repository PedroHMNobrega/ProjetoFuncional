import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Filters {
  search?: string
  isOpen: boolean
  isLocked: boolean
  orderBy?: string
  selectUser?: string
}

@Component({
  selector: 'app-pulls-filters',
  templateUrl: './pulls-filters.component.html',
  styleUrls: ['./pulls-filters.component.scss']
})
export class PullsFiltersComponent implements OnChanges {
  @Input()
  //@ts-ignore
  users: Record<string, PullRequest[]>;

  @Output() filterChangeEvent = new EventEmitter<Filters>()

  userNames: string[];

  constructor() {
    this.userNames = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.userNames = Object.keys(this.users)
  }

  onFormChange(f: NgForm) {
    const { locked, opened, orderBy, search, selectUser } = f.value;
    this.filterChangeEvent.emit({
      search,
      isOpen: opened,
      isLocked: locked,
      orderBy: orderBy,
      selectUser: selectUser
    })
  }
}
