import { Component, EventEmitter, Output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mfa-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mfa-input">
      <input 
        type="text" 
        maxlength="6" 
        [value]="code()" 
        (input)="onInput($event)" 
        placeholder="Ingresa código TOTP" 
        class="form-control"
      />
      <small *ngIf="error()" class="text-danger">{{ error() }}</small>
    </div>
  `,
  styles: [`
    .mfa-input { max-width: 200px; margin: auto; }
    input { text-align: center; font-size: 1.2rem; }
  `]
})
export class MfaInputComponent {
  // signal que contiene el código ingresado
  code = signal('');
  error = signal<string | null>(null);

  // evento que se emite al completar los 6 dígitos
  @Output() complete = new EventEmitter<string>();

  constructor() {
    // efecto que detecta cuando se completan 6 dígitos
    effect(() => {
      if (this.code().length === 6) {
        this.complete.emit(this.code());
      }
    });
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    if (value.length <= 6) {
      this.code.set(value);
      this.error.set(null);
    } else {
      this.error.set('El código debe tener 6 dígitos');
    }
  }

  reset() {
    this.code.set('');
    this.error.set(null);
  }
}