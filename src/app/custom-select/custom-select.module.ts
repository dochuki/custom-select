import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomSelectComponent} from './custom-select/custom-select.component';
import {SearchFieldComponent} from './search-field/search-field.component';
import {SelectListComponent} from './select-list/select-list.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';

@NgModule({
  declarations: [CustomSelectComponent, SearchFieldComponent, SelectListComponent, MultiSelectComponent],
  imports: [
    CommonModule
  ],
  exports: [CustomSelectComponent, MultiSelectComponent]
})
export class CustomSelectModule {
}
