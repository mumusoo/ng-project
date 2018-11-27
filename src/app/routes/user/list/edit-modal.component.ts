import { Component, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';

import { SFSchema } from '@delon/form';
import { map } from 'rxjs/operators';
import { User, UserService } from 'app/core/user/index'

@Component({
    selector: `app-user-dialog-modal`,
    template: `
    <div class="modal-header">
        <div class="modal-title">用户编辑</div>
    </div>

    <p style="width:500px" >参数：{{record | json}}</p>

    <sf #sf mode="edit" [schema]="updateSchema" [ui]="ui" [formData]="i" button="none">
        <div class="modal-footer">
            <button nz-button type="button" (click)="cancel()">关闭</button>
            <button nz-button type="button" [nzType]="'primary'" (click)="ok()" [disabled]="!sf.valid" >保存</button>
        </div>
    </sf>
`,
})
export class EditModalComponent {
    @Input() record: any;

    constructor(
        private modal: NzModalRef,
        private userService: UserService,
        private msg: NzMessageService
        ) {
            console.log(this.record);

        }

     // sf 编辑表单
  private updateSchema: SFSchema = {
    properties: {
      login: {
        type: 'string',
        title: '登陆名',
        minLength: 3
      },
      email: {
        type: 'string',
        title: '邮箱',
        format: 'email',
        maxLength: 20
      },
      phone: {
        type: 'string',
        title: '电话',
        format: 'phone',
        maxLength: 20
      },
    },
    required: ['email', 'login']
  };

  private ui = {
    $login:{
        validator: (value: any) => this.userService.isRegister(value).pipe(
            map(res => (res.body > 0) ? [{ keyword: 'required', message: '用户名已存在' }] : [])
          ),
        placeholder: '用户登录名',
        spanLabel: 5,
        spanControl: 12,
    },
    $email:{
        validator: (value: any) => this.userService.isRegister(value).pipe(
            map(res => (res.body > 0) ? [{ keyword: 'required', message: '邮箱已存在' }] : [])
          ),
        optionalHelp: '请使用常用邮箱',
        placeholder: '用户邮箱',
        spanLabel: 5,
        spanControl: 12,
    },
    $phone:{
        spanLabel: 5,
        spanControl: 12,
    }
  }


  cancel() {
    this.modal.destroy();
  }

  ok() {
    this.modal.close(`new time: ${+new Date()}`);
    this.cancel();
  }


}