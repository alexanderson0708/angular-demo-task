import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IForm } from '../services/form.service';
import { LocalStorageService } from '../services/local-storage.service';

@Directive({
  selector: '[appEnterSubmit]'
})
export class EnterSubmitDirective {
  @Input() formGroup!: FormGroup<IForm>;
  @Input() isSearchActive!: boolean;
  @Output() enterSumbit = new EventEmitter<void>();

  @HostListener('document:keydown.enter', ['$event'])
  handleEnter(event: KeyboardEvent): void {
    if (this.formGroup?.valid && this.isSearchActive) {
      this.enterSumbit.emit()
    }
  }
}
