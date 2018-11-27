import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './list/list.component';
import { EditDrawerComponent } from './list/edit-drawer.component';
import { EditModalComponent } from './list/edit-modal.component';

const COMPONENTS = [
  UserListComponent
];
const COMPONENTS_NOROUNT = [EditDrawerComponent,EditModalComponent];

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class UserModule { }
