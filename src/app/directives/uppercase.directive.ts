import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',
  standalone: true,
})
export class UppercaseDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const uppercaseValue = value.toUpperCase();
    this.el.nativeElement.value = uppercaseValue;
    this.control.control?.setValue(uppercaseValue, { emitEvent: false });
  }
}
