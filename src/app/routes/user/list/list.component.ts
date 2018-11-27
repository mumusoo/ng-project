import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { map } from 'rxjs/operators';
import {
  STColumnSort,
  STMultiSort,
  STColumn,
  STColumnButton,
  STData,
  STRes,
} from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { SFSchema } from '@delon/form';

import { EditDrawerComponent } from '../list/edit-drawer.component';
import { EditModalComponent } from '../list/edit-modal.component';
import { User, UserService } from 'app/core/user/index'
import { Urls } from 'app/core/url'


@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
})
export class UserListComponent implements OnInit {
  private urls = Urls;
  private url = this.urls.getUsers;
  private ps = 7; // 每页显示数据
  private total: any = 8; // 数据条数
  private loading = false;
 // private args: any = { _allow_anonymous: true }; //查询参数
  private args: any = { search:'' }; //查询参数
  private addModal; //添加用户模态框
  private updateModal;//修改用户模态框
  private selectedRows: STData[] = [];
  private events: any[] = [];
  private scroll = { y: '400px' };
  private user: User;
  private users: User[] = [];
  private addD1sabled = false;
  private submitting = false;

  // 排序拼接规则
  private stSort: STMultiSort = {
    key: 'sort',
    separator: ',',
    nameSeparator: ','
  }
  // 登录名排序
  private loginColumnSort: STColumnSort = {
    reName: { ascend: 'asc', descend: 'desc' },
    key: 'login'
  }
  // 创建时间排序
  private createDateColumnSort: STColumnSort = {
    reName: { ascend: 'asc', descend: 'desc' },
    key: 'created_date'
  }
  private status = [
    { index: 0, text: '激活', value: 1, type: 'default', checked: false },
    {
      index: 1,
      text: '未激活',
      value: 0,
      type: 'processing',
      checked: false,
    },

  ];
  // 响应参数重命名
  private res: STRes = {
    reName: { list: 'results' }
  }
  //st 表格字段
  private columns: STColumn[] = [
    { title: 'id', index: 'id', type: 'checkbox' },
    // { title: 'Avatar', index: 'picture.thumbnail', type: 'img', width: '80px' },
    {
      title: '账号',
      index: 'login',
      width: '80px',
      sort: this.loginColumnSort,
    },
    {
      title: '姓名',
      index: 'name',
      width: '130px',
      format: (item: any) => `${item.name} `,
      type: 'link',
      click: (item: any) => this.message.info(`${item.name}`),
    },
    { title: '邮箱', index: 'email', width: '180px' },
    { title: '电话', index: 'phone', width: '130px' },
    {
      title: '状态',
      index: 'activated',
      type: 'badge',
      badge: {
        true: { text: '激活', color: 'success' },
        false: { text: '未激活', color: 'error' },
      },
      width: '90px',
      filter: {
        menus: [
          { text: '激活', value: '1' },
          { text: '未激活', value: '0' },
        ],
        fn: (filter: any, record: any) =>
          record.activated.indexOf(filter.value) === 0,
      },
    },

    // { title: 'Events', render: 'events', width: '90px' },
    {
      title: '注册时间', index: 'createdDate', type: 'date', width: '150px', dateFormat: 'YYYY-MM-DD',
      sort: this.createDateColumnSort,
    },
    // { title: '修改人', index: 'lastModifiedBy', width: '120px', },
    // { title: '修改时间', index: 'lastModifiedDate', type: 'date', width: '150px', dateFormat: 'YYYY-MM-DD' },
    {
      title: '操作',
      width: '150px',
      buttons: <STColumnButton[]>[
        {
          // icon: 'edit',
          text: '编辑',
          type: 'modal',
          modal: {
            paramsName: 'record',
            component: EditModalComponent,
          },
          click: (record: any, modal: any) =>
            this.message.success(
              `重新加载页面，回传值：${JSON.stringify(modal)} `,
            ),

        },
        {
          // icon: 'delete',
          text: '删除',
          type: 'del',
          click: (item: any) => this.message.info(`deleted [${item.id}]`),
          iif: (item: any) => item.id != '1',
        },
        {
          text: '更多',
          children: [
            {
              text: `权限`,
              type: 'drawer',
              drawer: {
                title: '权限',
                component: EditDrawerComponent
              },
              click: (record: any) =>
                this.message.error(`过期【${record.name}】`),
              format: (record: any) => `权限`,
            },
            {
              text: `重新开始`,
              click: (record: any) =>
                this.message.success(`重新开始【${record.name}】`),
            },
          ],
        },
      ],
    },
  ];

  // sf 新增表单
  private schema: SFSchema = {
    properties: {
      login: {
        type: 'string',
        title: '登陆名',
        minLength: 3,
        ui: {
          validator: (value: any) => this.userService.isRegister(value).pipe(
            map(res => (res.body > 0) ? [{ keyword: 'required', message: '用户名已存在' }] : [])
          ),
          placeholder: '用户登录名',
          spanLabel: 4,
        }
      },
      email: {
        type: 'string',
        title: '邮箱',
        format: 'email',
        maxLength: 20,
        ui: {
          validator: (value: any) => this.userService.isRegister(value).pipe(
            map(res => (res.body > 0) ? [{ keyword: 'required', message: '邮箱已存在' }] : [])
          ),
          optionalHelp: '请使用常用邮箱',
          placeholder: '用户邮箱',
          spanLabel: 4,
        }
      }
    },
    required: ['email', 'login']
  };


  constructor(public http: _HttpClient,
    private message: NzMessageService,
    private modalSrv: NzModalService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // this.validateForm = this.fb.group({
    //   login: [null, [Validators.required]],
    //   email: [null, [Validators.required, Validators.email]]
    // });

    // this.userService.query(this.url).subscribe(res =>{
    //   console.log(res.body);
    //   this.users=res.body;
    // });

    this.user = { login: '', email: '' };
  }


  fullChange(val: boolean) {
    // this.scroll = val ? { y: '350px' } : { y: '230px' };
  }


  checkboxChange(list: STData[]) {
    this.selectedRows = list;
  }

  activated(ac: any) {
    for (const i in this.selectedRows) {
      this.users.push({ id: this.selectedRows[i].id });
    }
    console.log(this.users);
  }


  submitAdd(value: User): void {
    console.log(value);
    this.userService.create(value).subscribe(res => {
      this.message.success('保存成功');
      this.addModal.destroy();
    });
  }

  close() {
    this.addModal.destroy();
  }

  add(tpl: TemplateRef<{}>) {
    this.addModal = this.modalSrv.create({
      nzTitle: '添加用户',
      nzContent: tpl,
      nzFooter: null
    });
  }

  update(tpl: TemplateRef<{}>) {
    this.updateModal = this.modalSrv.create({
      nzTitle: '修改用户',
      nzContent: tpl,
      nzFooter: null
    });
  }




  // confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
  //   if (!control.value) {
  //     return { required: true };
  //   } else if (control.value !== this.validateForm.controls.password.value) {
  //     return { confirm: true, error: true };
  //   }
  // };

  // add(tpl: TemplateRef<{}>) {
  //   const that = this;
  //   let invalidated=false;
  //   this.user = { login: '', email: '' };
  //   const modal = this.modalSrv.create({
  //     nzTitle: '添加用户',
  //     nzContent: tpl,
  //     nzFooter: [
  //       {
  //         label: '关闭',
  //         shape: 'default',
  //         onClick: () => modal.destroy()
  //       },
  //       {
  //         label: '提交',
  //         type: 'primary',
  //         loading: this.submitting,
  //         disabled: this.addDisabled,
  //         onClick(): void {
  //           this.loading = true;
  //           this.disabled = true;

  //           for (const i in that.validateForm.controls) {
  //             that.validateForm.controls[i].markAsDirty();
  //             that.validateForm.controls[i].updateValueAndValidity();
  //           }
  //           if (that.validateForm.invalid) {
  //             that.message.error(`验证失败`);
  //             invalidated=true;
  //           } else {
  //             that.userService.isRegister(that.user.login).subscribe(res => {
  //               console.log(res.body);
  //               if (res.body >= 1) {
  //                 that.message.error(`用户名已存在！`);
  //                 invalidated=true;
  //               } else {
  //                 that.userService.isRegister(that.user.email).subscribe(res => {
  //                   if (res.body >= 1) {
  //                     that.message.error(`邮箱已存在！`);
  //                     invalidated=true;
  //                   }
  //                   else {
  //                     that.userService.create(that.user).subscribe(res => {
  //                       that.message.success('保存成功');
  //                       this.loading=false;
  //                       this.disabled=false;
  //                       modal.destroy();
  //                       this.loading = false;
  //                       this.disabled = false;
  //                     });
  //                   }
  //                 });
  //               }
  //               if(invalidated){
  //                 setTimeout(() => {
  //                   this.loading = false;
  //                   this.disabled = false;
  //                 }, 1000);
  //               }
  //             });
  //           }
  //         }
  //       }
  //     ]
  //     // nzOnOk: () => {
  //     // //  this.loading = true;
  //     //   console.log(this.user);
  //     //   if(this.user.login.trim()==''){
  //     //     this.message.error('账户名不允许为空！');
  //     //   }
  //     //   // this.http
  //     //   //   .post('/rule', { user: this.user })
  //     //   //   .subscribe(() => {
  //     //   //    // this.getData();
  //     //   //   });
  //     // },
  //   });
  // }

}
