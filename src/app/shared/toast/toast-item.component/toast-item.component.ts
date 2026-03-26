import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Toast } from '../../../core/ui/toast/service/toast.service';

@Component({
  selector: 'app-toast-item',
  templateUrl: './toast-item.component.html',
  styleUrl: './toast-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastItemComponent {
  toast = input.required<Toast>();
  dismissed = output<number>();

  get icon(): string {
    return { success: '✓', error: '⚠', info: 'ℹ' }[this.toast().type];
  }
}
