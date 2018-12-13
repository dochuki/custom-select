import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {EKeyCode} from '../enums/e-key-code.enum';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectListComponent implements OnInit {

  private _filtered: { key: string, value: any }[] = [];
  private _isActive = true;
  private _currentPos = 0;
  @ViewChild('selectBar') selectBar: ElementRef<HTMLUListElement>;
  @Output() selectEmitter: EventEmitter<{ item: string, index: number }> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  @Input()
  get filtered(): { key: string, value: any }[] {
    return this._filtered;
  }

  set filtered(value: { key: string, value: any }[]) {
    this._filtered = value;
  }

  @Input()
  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  @Input()
  get currentPos(): number {
    return this._currentPos;
  }

  set currentPos(value: number) {
    const list = this.selectBar.nativeElement;
    const tmpChild = list.children[value];
    if (!!list && !!tmpChild) {
      this.selectBar.nativeElement.scroll({
        top: tmpChild.clientHeight * value,
        left: 0,
        behavior: 'smooth'
      });
    }
    this._currentPos = value;

  }

  emitItem(item, index) {
    this.selectEmitter.emit({item: item, index: index});
  }

}
