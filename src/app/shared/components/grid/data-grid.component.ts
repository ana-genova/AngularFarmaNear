import {Component, Input, OnInit} from '@angular/core';
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
export class DataGridComponent implements OnInit {

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
    this.columns = [
      {id: 1, field: 'id', header: 'ID'},
      {id: 2, field: 'product', header: 'Produto'},
      {id: 3, field: 'brand', header: 'Marca'},
      {id: 4, field: 'quantity', header: 'Quantidade'},
      {id: 5, field: 'price', header: 'Preço'},
    ];

    this.rows = Array.from({length: 42}).map((_, i) => ({
      id: i + 1,
      product: `Remédio ${i + 1}`,
      brand: `Marca ${i + 1}`,
      quantity: 5 + i,
      price: `R$ ${20 + i},98`,
    }));

    this.totalPages = Math.ceil(this.rows.length / this.pageSize);
    this.pageInput = this.currentPage;
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
