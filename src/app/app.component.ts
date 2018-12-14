import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  private _form: FormGroup = new FormGroup({
    select: new FormControl(),
    select2: new FormControl(),
    select3: new FormControl(),
    select4: new FormControl()
  });
  list: { key: string, value: any }[] = [
    {key: 'Wasser', value: 'Wasser'},
    {key: 'Fanta', value: 'Fanta'},
    {key: 'Cola', value: 'Cola'},
    {key: '7 Up', value: '7 Up'},
    {key: 'Sprite', value: 'Sprite'},
    {key: 'Pepsi', value: 'Pepsi'},
    {key: 'Wurstwasser', value: 'Wurstwasser'},
  ];

  public bvSubject: BehaviorSubject<{ key: string, value: any }[]> =
    new BehaviorSubject([
      {key: 'Wasser', value: 'Wasser'},
      {key: 'Fanta', value: 'Fanta'},
      {key: 'Cola', value: 'Cola'},
      {key: '7 Up', value: '7 Up'},
      {key: 'Sprite', value: 'Sprite'},
      {key: 'Pepsi', value: 'Pepsi'},
      {key: 'Wurstwasser', value: 'Wurstwasser'},
    ]);

  constructor() {
  }


  get form(): FormGroup {
    return this._form;
  }

  set form(value: FormGroup) {
    this._form = value;
  }

  logForm() {
    console.log(this.form.value);
  }

  testNgForm(val) {
    console.log(val);
  }
}
