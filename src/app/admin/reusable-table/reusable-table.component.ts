import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-reusable-table',
   imports: [
       CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './reusable-table.component.html',
  styleUrl: './reusable-table.component.scss'
})
export class ReusableTableComponent {
   @Input() data: any[] = [];
  @Input() columns: { key: string; label: string }[] = [];
  @Input() isLoading: boolean = false;
  @Input() showActions: boolean = false;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ContentChild('price') priceTemplate?: TemplateRef<any>;

  dataSource = new MatTableDataSource<any>();
  displayedColumnKeys: string[] = [];

  customTemplates: Record<string, TemplateRef<any>> = {};

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.data || [];

    // Set dynamic columns + optional action column
    this.displayedColumnKeys = this.columns.map(col => col.key);
    if (this.showActions) {
      this.displayedColumnKeys.push('actions');
    }

    // Register custom templates (extend this if you have more)
    if (this.priceTemplate) {
      this.customTemplates['price'] = this.priceTemplate;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
