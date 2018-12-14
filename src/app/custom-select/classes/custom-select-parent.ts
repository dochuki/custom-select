import {AfterViewInit, HostListener, Input, OnInit} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {EKeyCode} from '../enums/e-key-code.enum';
import {ICustomSelect} from '../interfaces/i-custom-select';

export abstract class CustomSelectParentComponent<T> implements OnInit, ControlValueAccessor, AfterViewInit {


  protected _data: ICustomSelect[] = [];
  protected _filtered: ICustomSelect[] = [];
  protected _isActive: boolean;
  protected _position: number;
  protected _value: any;
  protected _disabled = false;
  protected _selected: ICustomSelect;

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

  protected constructor() {
  }

  ngOnInit() {
    this._newAssign();
  }


  ngAfterViewInit(): void {
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

  onChange: any = () => {

  };
  onTouched: any = () => {
  };

  /*GETTER AND SETTER*/
  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();

  }

  private _newAssign() {
    this.filtered = Object.assign([], this.data);
  }

  @Input()
  get selected(): ICustomSelect {
    return this._selected;
  }

  set selected(value: ICustomSelect) {
    this._selected = value;
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
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }


  get filtered(): ICustomSelect[] {
    return this._filtered;
  }

  set filtered(value: ICustomSelect[]) {
    this._filtered = value;
  }

  @Input()
  get data(): ICustomSelect[] {
    return this._data;
  }

  set data(value: ICustomSelect[]) {
    this._data = value;
  }

  protected setItem(value, index) {
    this.value = value;
    this.position = index;
  }


}
