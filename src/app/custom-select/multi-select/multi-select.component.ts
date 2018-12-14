import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CustomSelectParentComponent} from '../classes/custom-select-parent';
import {isArray} from 'rxjs/internal-compatibility';
import {ICustomSelect} from '../interfaces/i-custom-select';
import {HelperClass} from '../classes/helper-class';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectComponent extends CustomSelectParentComponent<any[]> implements OnInit, ControlValueAccessor, AfterViewInit {


  private _chips = [];
  private _tmpSearchVal = '';

  constructor(protected change: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    if (isArray(this.selected)) {
      const listOfSelected = this.selected as ICustomSelect[];
      for (let i = 0; i < listOfSelected.length; i++) {
        const selected = this.selected[i];
        this.setItem(selected, i);
        console.log(selected);
      }
    } else {
      this.value = this.placeholder;
      this.tmpSearchVal = '';
      this.position = 0;
    }
  }

  setItem(item: any, index) {
    setTimeout(() => {
      this.change.markForCheck();
      this.position = index;

      this.addItemToChips(item);
      this.value = this._chips;
      this.tmpSearchVal = HelperClass.valIsArray(this.value);


      this.isActive = false;
    });
  }

  addItemToChips(chip) {
    if (this._inChips(chip)) {
      return;
    } else {
      this._chips.push(chip);
    }
  }

  private _inChips(chip) {
    for (let i = 0; i < this._chips.length; i++) {
      const chiped = this._chips[i];
      if (chip.key === chiped.key) {
        return true;
      }
    }
    return false;
  }

  @Input()
  get data(): any[] {
    return this._data;
  }

  set data(value: any[]) {
    this._data = value;
  }

  get chips(): any[] {
    return this._chips;
  }

  set chips(value: any[]) {
    this._chips = value;
  }

  deleteChip(chip) {
    this.chips.forEach((value, index, array) => {
      if (chip.key === value.key) {
        this.chips.splice(index, 1);
        this.tmpSearchVal = HelperClass.valIsArray(this.value);
      }
    });
  }

  get tmpSearchVal(): string {
    return this._tmpSearchVal;
  }

  set tmpSearchVal(value: string) {
    this._tmpSearchVal = value;
  }
}
