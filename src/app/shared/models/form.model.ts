import { FormControl, FormGroup } from "@angular/forms";

export interface Form {
  search: FormControl<string>,
  author: FormControl<string>,
  filters: FormGroup<Filters>;
}

export interface Filters {
  searchType: FormControl<string[]>;
  searchBy: FormControl<string[]>;
}

export type FiltersName = 'searchType' | 'searchBy'