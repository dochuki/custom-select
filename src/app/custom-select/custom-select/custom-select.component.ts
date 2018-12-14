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
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {EKeyCode} from '../enums/e-key-code.enum';
import {CustomSelectParentComponent} from '../classes/custom-select-parent';

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
export class CustomSelectComponent extends CustomSelectParentComponent<string> implements OnInit, ControlValueAccessor, AfterViewInit {


  @ViewChild('searchField') searchField: ElementRef<HTMLInputElement>;

  constructor(private change: ChangeDetectorRef) {
    super();
  }


  ngOnInit() {
    super.ngOnInit();

    setTimeout(() => {
      this.change.markForCheck();
      if (!!this.selected && this.selected.key !==  '') {
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


}
