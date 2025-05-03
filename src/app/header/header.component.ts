import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AutofocusDirective } from '../shared/directives/autofocus.derective';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatSelectModule,
    AutofocusDirective,
    NgClass,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  form!: FormGroup;
  isSearchActive: boolean = false;
  searchText: string = '';
  isNavOpen = false;

  navLinks = [
    { icon: 'assets/svg/link.svg', label: 'Ссылки', path: '#', isActive: true },
    {
      icon: 'assets/svg/contacts.svg',
      label: 'Контакты',
      path: '#',
      isActive: true,
    },
    { icon: 'assets/svg/tags.svg', label: 'Теги', path: '#', isActive: false },
    {
      icon: 'assets/svg/favourites.svg',
      label: 'Избранное',
      path: '#',
      isActive: true,
    },
    {
      icon: 'assets/svg/history.svg',
      label: 'Посещения',
      path: '#',
      isActive: true,
    },
  ];
  searchTypeOptions = ['Я участник', 'Строгий поиск', 'В заголовках'];
  searchOnlyOptions = ['Теги', 'Просьбы', 'Контакты'];
  historyData = [''];

  @ViewChild('formWrapper') formWrapper!: ElementRef;

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      search: [''],
      author: [''],
      filters: this.fb.group({
        searchType: this.fb.array([]),
        searchBy: this.fb.array([]),
      }),
    });

    this.restoreFormState();
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const elem = this.formWrapper;
    if (elem) {
      const clickedInside = elem.nativeElement.contains(event.target);
      if (
        !clickedInside &&
        !(event.target as HTMLElement).closest('mat-option')
      ) {
        this.isSearchActive = false;
        this.saveFormState();
        this.saveToHistory();
      }
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnter(event: KeyboardEvent) {
    if (this.form.valid && this.isSearchActive) {
      this.saveToHistory();
    }
  }

  saveToHistory() {
    const currentValue = this.form.getRawValue();
    if (
      this.historyData.length === 0 ||
      JSON.stringify(this.historyData[this.historyData.length - 1]) !==
      JSON.stringify(currentValue.search)
    ) {
      this.historyData.push(currentValue.search);
    }
  }

  onCheckboxChange(event: any, controlName: string) {
    const formArray: FormArray = this.form.get([
      'filters',
      controlName,
    ]) as FormArray;
    const value = event.source.value;

    if (event.checked) {
      const exists = formArray.controls.some((ctrl) => ctrl.value === value);
      if (!exists) {
        formArray.push(this.fb.control(event.source.value));
      }
    } else {
      const i = formArray.controls.findIndex(
        (x) => x.value === event.source.value
      );
      formArray.removeAt(i);
    }
  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
    this.restoreFormState();
    if (this.isSearchActive) {
      const savedHistory = localStorage.getItem('historyData');
      this.historyData = savedHistory ? JSON.parse(savedHistory) : [];
    }
  }

  saveFormState() {
    const formData = this.form.getRawValue();
    localStorage.setItem('formState', JSON.stringify(formData));
    localStorage.setItem('historyData', JSON.stringify(this.historyData));
  }

  restoreFormState() {
    const savedState = localStorage.getItem('formState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);

      this.form.patchValue({
        search: parsedState.search,
        author: parsedState.author,
      });

      const filtersGroup = this.form.get('filters') as FormGroup;

      const searchTypeArray = filtersGroup.get('searchType') as FormArray;
      searchTypeArray.clear();
      if (Array.isArray(parsedState.filters?.searchType)) {
        parsedState.filters.searchType.forEach((value: string) => {
          searchTypeArray.push(this.fb.control(value));
        });
      }

      const searchByArray = filtersGroup.get('searchBy') as FormArray;
      searchByArray.clear();
      if (Array.isArray(parsedState.filters?.searchBy)) {
        parsedState.filters.searchBy.forEach((value: string) => {
          searchByArray.push(this.fb.control(value));
        });
      }
    }
  }

  isChecked(controlName: 'searchType' | 'searchBy', value: string): boolean {
    const formArray = this.form.get(['filters', controlName]) as FormArray;
    return formArray.value.includes(value);
  }
}
