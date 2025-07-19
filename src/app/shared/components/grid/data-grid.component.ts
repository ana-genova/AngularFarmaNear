import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {ColumnDef, DataGridButtons} from '../../interface/data-grid.interface';

@Component({
  selector: 'app-data-grid',
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './data-grid.component.html'
})
export class DataGridComponent implements OnInit, OnChanges {

  @Input()
  buttons: Array<DataGridButtons> | undefined;

  @Input()
  title: string | undefined;

  @Input()
  columns: ColumnDef[] = [];

  @Input()
  rows: any[] = [];

  currentPage = 1;
  pageInput: number = 1;
  pageSize = 5;
  totalPages = 1;

  selectedRow = null;

  ngOnInit(): void {
    this.pageInput = this.currentPage;
  }

  ngOnChanges(): void {
    this.totalPages = Math.ceil(this.rows.length / this.pageSize);
  }

  get pagedRows(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.rows.slice(start, start + this.pageSize);
  }

  goTo(page: number): void {
    if (page < 1 || page > this.totalPages) {
      this.pageInput = this.currentPage;
      return;
    }
    this.currentPage = page;
    this.pageInput = page;
  }

  onEnterPage(): void {
    const p = Math.floor(this.pageInput);
    this.goTo(p);
  }

  selectRow(row: any) {
    this.selectedRow = row;
  }
}
