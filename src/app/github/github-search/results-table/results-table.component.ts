import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RepositoryItem} from '../../models/interfaces';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent {
  @Input('repositoryItems') repositoryItems: RepositoryItem[];
  @Input('total') total: number;
  @Input('limit') limit: number;
  @Input('page') currentPage: number;
  @Output('onPagination') paginationEmitter: EventEmitter<number> = new EventEmitter();
  @Output('onItemCheckBoxCheck') checkEmitter: EventEmitter<RepositoryItem> = new EventEmitter();

  public onPagination(event) {
    this.paginationEmitter.emit(event.page);
  }

  public onItemCheckBoxCheck(item) {
    this.checkEmitter.emit(item);
  }
}
