import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {EKeyCode} from '../enums/e-key-code.enum';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFieldComponent implements OnInit {


  private _data: { key: string, value: any }[] = [];
  private _isActive = false;
  @Output() listEmitter: EventEmitter<{ key: string, value: any }[]> = new EventEmitter();
  @Output() statusEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() searchValueEmitter: EventEmitter<string> = new EventEmitter();
  private _searchValue = '';
  private _placeholder = '';
  private _tmpSearchVal = '';
  private _disabled = false;
  @ViewChild('searchField') searchField: ElementRef<HTMLInputElement>;

  @HostListener('keydown', ['$event']) onEnter(e) {
    const keyCode = e.which;
    switch (keyCode) {
      case EKeyCode.ENTER:
        e.preventDefault();
        return false;
    }
  }

  constructor() {
  }

  ngOnInit() {
  }


  public searchVal($event) {

    const searchInput = $event.target.value;
    this._tmpSearchVal = searchInput;

    const list: { key: string, value: any }[] = [];
    this.data.forEach((value: { key: string, value: any }) => {
      if (typeof value.key === 'string' && value.key.toLowerCase().indexOf(searchInput.toLowerCase()) > -1) {
        list.push(value);
      }
    });

    this.listEmitter.emit(list);
  }

  public showBar() {
    this.isActive = true;
    this.statusEmitter.emit(this.isActive);
  }


  public hideBar(e) {
    setTimeout(() => {
      this.isActive = false;
      this.statusEmitter.emit(this.isActive);
      if (this._tmpSearchVal !== this.searchValue) {
        this.searchField.nativeElement.value = this.searchValue;
      }

    }, 150);
  }


  @Input()
  get data(): { key: string, value: any }[] {
    return this._data;
  }

  set data(value: { key: string, value: any }[]) {
    this._data = value;
  }

  @Input()
  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  @Input()
  get searchValue(): string {
    return this._searchValue;
  }

  set searchValue(value: string) {
    this.placeholder = value;
    this._searchValue = value;
  }

  searchValChanged($event) {
    this.searchValueEmitter.emit($event.target.value);
  }

  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }


}
