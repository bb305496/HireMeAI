import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  message: string;
  type: ToastType;
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();
  private nextId = 0;

  show(message: string, type: ToastType = 'info', duration = 3500) {
    const id = this.nextId++;
    this._toasts.update(t => [...t, { message, type, id }]);
    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: number) {
    this._toasts.update(t => t.filter(toast => toast.id !== id));
  }
}
