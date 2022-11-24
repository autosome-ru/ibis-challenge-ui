import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatSort, Sort, SortDirection} from "@angular/material/sort";
import {IBISTableColumnModel, IBISTableDisplayedColumns} from "../../../../models/table.model";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'ibis-mat-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TableComponent<T> implements AfterViewInit, OnChanges {
  @ViewChild("table", {static: true, read: ElementRef}) tableRef!: ElementRef<HTMLTableElement>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild("sort", {static: false}) sort!: MatSort;
  @Input()
  public columnModel!: IBISTableColumnModel<T>;
  @Input()
  public sortingDataAccessor!: ((data: T, s: string) => string | number);
  @Input()
  public externalPaginator!: MatPaginator;
  @Input()
  public isEmpty!: boolean;
  @Input()
  public actionTemplate!: TemplateRef<{ value: T }>;
  @Input()
  public getPopoverTitle: (row: T) => string = null!;
  @Input()
  public popoverContentTemplate: TemplateRef<{ row: T }> = null!;
  @Input()
  public clickableRow = false;
  @Input()
  public displayedColumns!: IBISTableDisplayedColumns<T>;
  public _dataSource!: MatTableDataSource<T>;

  public initialValue!: T[];
  @Input()
  public initialSorting!: { active: string; direction: SortDirection };
  @Input()
  public cellClass!: string;
  @Input()
  public paginatorOptions!: number[];
  @Input()
  public expandCellContentTemplate!: TemplateRef<{ row: T }>;
  public _expandedRow!: T | null;
  @Output()
  public rowClickEmitter = new EventEmitter<T>();
  @Output()
  public sortEmitter = new EventEmitter<Sort>();
  @Output()
  public actionClicked = new EventEmitter<T>();
  @HostBinding("class.ibis-table")
  private readonly cssClass = true;
  @Input()
  private sortData!: ((data: T[], sort: MatSort) => T[]);

  constructor(
    private dialog: MatDialog,
  ) {
  }

  @Input()
  set data(value: T[]) {
    this._dataSource = new MatTableDataSource<T>(value);
    this.initialValue = value;
    this.checkDataSource();
    if (this.externalPaginator && !this.paginatorOptions) {
      this._dataSource.paginator = this.externalPaginator;
    }
  }

  ngAfterViewInit(): void {
    if (this._dataSource) {
      this.checkDataSource();
    }
  }

  checkDataSource(): void {
    if (this.sortingDataAccessor) {
      this._dataSource.sortingDataAccessor = this.sortingDataAccessor;
    }
    if (this.sortData) {
      this._dataSource.sortData = ((data, sort) =>
        sort.direction ? this.sortData(data, sort) : this.initialValue);
    }
    this._dataSource.sort = this.sort;

    if (this.paginatorOptions) {
      this._dataSource.paginator = this.paginator;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['externalPaginator'] && this.externalPaginator) {
      if (this.externalPaginator && !this.paginatorOptions) {
        this._dataSource.paginator = this.externalPaginator;
      }
    }
  }


  public _handleRowClick(row: T): void {
    // if (this.clickableRow) {
    //   if (this.popoverContentTemplate) {
    //     this.dialog.open(CustomTemplateDialogComponent, {
    //       autoFocus: false,
    //       panelClass: 'custom-dialog-container',
    //       data: {
    //         title: this.getPopoverTitle(row),
    //         template: this.popoverContentTemplate,
    //         templateContext: {row}
    //       }
    //     });
    //   } else {
    //     this.rowClickEmitter.emit(row);
    //   }
    // }
  }


  getDisplayedColumns(): (string | keyof T)[] {
    const result = [];
    result.push(...this.displayedColumns);
    if (this.actionTemplate) {
      result.push("__action__");
    }
    return result;
  }

  sortChanged(event: Sort): void {
    this.sortEmitter.emit(event);
  }

}
