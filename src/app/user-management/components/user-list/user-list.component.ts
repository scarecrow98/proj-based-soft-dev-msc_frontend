import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserListItem } from 'src/app/core/models/user.model';

export interface OnToggleAdminPayload {
  userId: string,
  isAdmin: boolean
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  @Input() users: UserListItem[] = [];

  @Output()
  private onToggleAdmin = new EventEmitter<OnToggleAdminPayload>;

  constructor() { }

  ngOnInit(): void {
  }

  toggleAdmin(userId: string, event: Event) {
    this.onToggleAdmin.emit({ userId, isAdmin: (event.target as HTMLInputElement).checked });
  }

}
