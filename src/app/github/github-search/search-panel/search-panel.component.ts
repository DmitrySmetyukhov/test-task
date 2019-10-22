import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchItem, SearchPanelDto, SearchVariants} from '../../models/interfaces';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  @Output('onSearch') searchPanelEmitter: EventEmitter<SearchPanelDto> = new EventEmitter();
  public searchItems: SearchItem[] = [
    {id: SearchVariants.byLang, name: 'By language'},
    {id: SearchVariants.byTopic, name: 'By topic'}
  ];

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  public onSearch() {
    this.searchPanelEmitter.emit({
      variant: this.searchVariant.value,
      query: this.query.value,
    });
  }

  public get searchVariant() {
    return this.form.get('searchVariant');
  }

  public get query() {
    return this.form.get('query');
  }

  private buildForm() {
    const form = {
      searchVariant: [SearchVariants.byLang],
      query: ['']
    };

    this.form = this.fb.group(form);
  }
}
