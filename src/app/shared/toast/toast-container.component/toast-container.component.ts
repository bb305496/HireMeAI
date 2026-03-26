import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService} from '../../../core/ui/toast/service/toast.service';
import { ToastItemComponent} from '../toast-item.component/toast-item.component';

@Component({
  selector: 'app-toast-container',
  imports: [ToastItemComponent],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastContainerComponent {
  protected toastService = inject(ToastService);
}
