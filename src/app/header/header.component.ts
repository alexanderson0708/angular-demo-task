import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})



export class HeaderComponent {
  navLinks = [
    { icon: 'assets/svg/link.svg', label: 'Ссылки', path: '#', isActive: true },
    { icon: 'assets/svg/contacts.svg', label: 'Контакты', path: '#', isActive: true },
    { icon: 'assets/svg/tags.svg', label: 'Теги', path: '#', isActive: false }, // неактивная ссылка
    { icon: 'assets/svg/favourites.svg', label: 'Избранное', path: '#', isActive: true },
    { icon: 'assets/svg/history.svg', label: 'Посещения', path: '#', isActive: true }
  ];

  isSearchActive: boolean = false
  searchText: string = ''
  readonly hideRequiredControl = new FormControl(false);
  historyData = [1, 2, 23, 3, 123, 12, 123123, 123123, 12, 312, 3, 23]

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive
    if (!this.isSearchActive) {
      this.searchText = ''
    }
  }

  activeLink: string = 'Ссылки';
}
