import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomSelectComponent} from './custom-select/custom-select.component';
import {SearchFieldComponent} from './search-field/search-field.component';
import {SelectListComponent} from './select-list/select-list.component';

@NgModule({
  declarations: [CustomSelectComponent, SearchFieldComponent, SelectListComponent],
  imports: [
    CommonModule
  ],
  exports: [CustomSelectComponent, SearchFieldComponent, SelectListComponent]
})
export class CustomSelectModule {
}
