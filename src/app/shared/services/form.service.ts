import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatCheckboxChange } from "@angular/material/checkbox";

export interface IForm {
  search: FormControl<string>,
  author: FormControl<string>,
  filters: FormGroup<IFilters>;
}

export interface IFilters {
  searchType: FormControl<string[]>;
  searchBy: FormControl<string[]>;
}

export type FiltersName = 'searchType' | 'searchBy'

@Injectable({
  providedIn: 'root'
})

export class FormService {

  constructor(private fb: FormBuilder) { }

  createForm(): FormGroup<IForm> {
    return this.fb.group<IForm>({
      search: this.fb.control('', { nonNullable: true }),
      author: this.fb.control('', { nonNullable: true }),
      filters: this.fb.group<IFilters>({
        searchType: this.fb.control([], { nonNullable: true }),
        searchBy: this.fb.control([], { nonNullable: true }),
      }),
    });
  }

  checkboxChange(form: FormGroup<IForm>, event: MatCheckboxChange, controlName: FiltersName) {
    const formControl: FormControl<string[]> = form.controls.filters.controls[controlName]
    const value = event.source.value;

    if (formControl) {
      if (event.checked) {
        const exists = formControl.value.some(el => el === value);
        if (!exists) {
          formControl.value.push(value);
        }
      } else {
        formControl.setValue(formControl.value.filter(x => x !== value));
      }
    }
  }

  restoreFormState(form: FormGroup<IForm>) {
    const savedState = localStorage.getItem('formState');

    if (savedState) {
      const parsedState = JSON.parse(savedState);
      const filtersGroup = form.controls.filters;

      form.patchValue({
        search: parsedState.search,
        author: parsedState.author,
      });

      if (filtersGroup) {
        const searchTypeArray = filtersGroup.controls.searchType;
        const searchByArray = filtersGroup.controls.searchBy;

        searchTypeArray.reset([]);
        searchByArray.reset([]);

        if (Array.isArray(parsedState.filters?.searchType)) {
          searchTypeArray.setValue(parsedState.filters.searchType.map((value: string) => value));
        }

        if (Array.isArray(parsedState.filters?.searchBy)) {
          searchByArray.setValue(parsedState.filters.searchBy.map((value: string) => value));
        }
      }
    }
  }

  isCheckedForm(form: FormGroup<IForm>, controlName: FiltersName, value: string): boolean {
    const formArray = form.controls.filters.controls[controlName];
    return formArray.value.includes(value);
  }

}