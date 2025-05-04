import {
  Directive,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[appClickOutsideForm]'
})
export class ClickOutsideFormDirective {
  @Output() clickedOutside = new EventEmitter<void>();

  constructor(private el: ElementRef) { }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const clickedInside = this.el.nativeElement.contains(event.target);
    const clickedOnExcluded = (event.target as HTMLElement).closest('mat-option');

    if (!clickedInside && !clickedOnExcluded) {
      this.clickedOutside.emit();
    }
  }
}
