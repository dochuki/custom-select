# CustomSelectField

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


#Custom-Select Informations



The select input became two components because the multi attribute would have increased the complexity for nothing.
In addition, some functionalities and attributes could be inherited.
I also think it doesn't make much difference whether I write the component name or set an attribute.

The two components have the following attributes which can be used. These are marked with [].

<app-custom-select 
[selected]="ICustomSelect" 
[disabled]="boolean">
##
<app-custom-multi-selct 
[selected]="ICustomSelect[]"  
[placeholder]="string" 
[disabled]="boolean">

