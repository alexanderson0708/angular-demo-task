import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AutofocusDirective } from '../shared/directives/autofocus.directive';
import { NgOptimizedImage } from '@angular/common';
import { FiltersName, FormService, IForm } from '../shared/services/form.service';
import { INavLink, NAV_LINK, ONLY_OPTIONS, TYPE_OPTIONS } from '../shared/constants/nav-link';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { EnterSubmitDirective } from '../shared/directives/enter-submit.directive';
import { ClickOutsideFormDirective } from '../shared/directives/clickOutside.directive';

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
    NgOptimizedImage,
    EnterSubmitDirective,
    ClickOutsideFormDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  form!: FormGroup<IForm>;
  isSearchActive: boolean = false;
  searchText: string = '';
  isNavOpen = false;
  historyData: string[] = [];
  navLinks: INavLink[] = NAV_LINK;
  searchTypeOptions: string[] = TYPE_OPTIONS;
  searchOnlyOptions: string[] = ONLY_OPTIONS;

  constructor(private formService: FormService, private localStorageService: LocalStorageService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.form = this.formService.createForm()
    this.formService.restoreFormState(this.form);

    this.localStorageService.history$.subscribe(data => {
      this.historyData = data
    })
  }

  handleOutsideClick() {
    this.isSearchActive = false;
    this.localStorageService.saveToHistory(this.form);
    this.localStorageService.saveFormState(this.form);
    console.log(this.form);

  }

  onCheckboxChange(event: MatCheckboxChange, controlName: FiltersName) {
    this.formService.checkboxChange(this.form, event, controlName)
  }

  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
  }

  onPressEnter() {
    this.localStorageService.saveToHistory(this.form);
  }

  toggleSearch() {
    this.isSearchActive = true;
    this.formService.restoreFormState(this.form);
    this.cdr.markForCheck()
  }

  isChecked(controlName: FiltersName, value: string): boolean {
    return this.formService.isCheckedForm(this.form, controlName, value)
  }
}
