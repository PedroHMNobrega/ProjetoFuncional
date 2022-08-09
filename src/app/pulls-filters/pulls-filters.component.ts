import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Filters {
  search?: string
  isOpen: boolean
  isLocked: boolean
  orderBy?: string
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
    const { locked, opened, orderBy, search } = f.value;
    this.filterChangeEvent.emit({
      search,
      isOpen: opened,
      isLocked: locked,
      orderBy: orderBy,
    })
  }

}
