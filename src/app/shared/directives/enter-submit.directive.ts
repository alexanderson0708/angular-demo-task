import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Form } from '../models/form.model';

@Directive({
  selector: '[appEnterSubmit]'
})
export class EnterSubmitDirective {
  @Input() formGroup!: FormGroup<Form>;
  @Input() isSearchActive!: boolean;
  @Output() enterSumbit = new EventEmitter<void>();

  @HostListener('document:keydown.enter', ['$event'])
  handleEnter(event: KeyboardEvent): void {
    if (this.formGroup?.valid && this.isSearchActive) {
      this.enterSumbit.emit()
    }
  }
}
