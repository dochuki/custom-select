import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {EKeyCode} from '../enums/e-key-code.enum';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSelectComponent implements OnInit, ControlValueAccessor, AfterViewInit {


  @ViewChild('searchField') searchField: ElementRef<HTMLInputElement>;
  private _data: { key: string, value: any }[] = [];
  private _position = 0;
  private _value = '';
  private _filtered: { key: string, value: any }[] = [];
  private _isActive = false;
  private _selected = '';
  private _disabled = false;

  @HostListener('keyup', ['$event'])
  selectItem(e) {
    e.preventDefault();

    this.isActive = true;
    const keyCode = e.which;
    switch (keyCode) {
      case EKeyCode.DOWN:
        this.position++;
        break;
      case EKeyCode.UP:
        this.position--;
        break;
      case EKeyCode.ENTER:
        if (!!this.filtered[this.position]) {
          this.setItem(this.filtered[this.position], this.position);
        }
        break;
    }

    if (this.position < 0) {
      this.position = this.filtered.length - 1;
    } else if (this.position >= this.filtered.length) {
      this.position = 0;
    }

  }


  constructor(private change: ChangeDetectorRef) {
  }


  ngOnInit() {
    this._newAssign();
    setTimeout(() => {
      this.change.markForCheck();
      if (this.selected !== '') {
        const ifFoundItem = this._findItem(this.selected);
        this.value = ifFoundItem.label;
        this.position = ifFoundItem.index;
      } else if (this.value === '' || this.value === null || !this.value) {
        this.value = this.filtered[0].value;
      }
    });
  }

  private _findItem(label): { label: string, index: number; } {
    const item = {
      label: '',
      index: 0
    };
    this.filtered.forEach((value, index, array) => {
      if (value === label) {
        item.label = value.key;
        item.index = index;
      }
    });
    return item;
  }

  ngAfterViewInit() {
  }

  onChange: any = () => {

  };
  onTouched: any = () => {
  };

  private _newAssign() {
    this.filtered = Object.assign([], this.data);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  setItem(item: { key: string, value: any }, index) {
    setTimeout(() => {
      this.change.markForCheck();
      this.position = index;
      this.value = item.value;
      this.isActive = false;
    });
  }

  getInformed(e) {
    if (e === '') {
      this.value = this.value;
    }
  }


  /*GETTER AND SETTER*/
  @Input()
  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();

  }

  @Input()
  get data(): { key: string, value: any }[] {
    return this._data;
  }

  set data(value: { key: string, value: any }[]) {
    this._data = value;
  }


  get filtered(): { key: string, value: any }[] {
    return this._filtered;
  }

  set filtered(value: { key: string, value: any }[]) {
    this._filtered = value;
  }


  get position(): number {
    return this._position;
  }

  set position(value: number) {
    this._position = value;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  @Input()
  get selected(): string {
    return this._selected;
  }

  set selected(value: string) {
    this._selected = value;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }


}
