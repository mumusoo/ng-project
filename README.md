###
1、风格指南：参照 https://angular.cn/guide/styleguide

总体命名原则：  
    风格 02-01  
        坚持所有符号使用一致的命名规则。  
        坚持遵循同一个模式来描述符号的特性和类型。推荐的模式为 feature.type.ts。  
使用点和横杠来分隔文件名  
    风格 02-02  
        坚持 在描述性名字中，用横杠来分隔单词。  
        坚持使用点来分隔描述性名字和类型。  
        坚持遵循先描述组件特性，再描述它的类型的模式，对所有组件使用一致的类型命名规则。推荐的模式为 feature.type.ts。  
        坚持使用惯用的后缀来描述类型，包括 *.service、*.component、*.pipe、.module、.directive。 必要时可以创建更多类型名，但必须注意，不要创建太多。  
符号名与文件名  
    风格 02-03  
        坚持为所有东西使用一致的命名约定，以它们所代表的东西命名。  
        坚持使用大写驼峰命名法来命名类。符号名匹配它所在的文件名。  
        坚持在符号名后面追加约定的类型后缀（例如 Component、Directive、Module、Pipe、Service）。  
        坚持在符号名后面追加约定的类型后缀（例如 .component.ts、.directive.ts、.module.ts、.pipe.ts、.service.ts）。  
        坚持在文件名后面追加约定的类型后缀（例如 .component.ts、.directive.ts、.module.ts、.pipe.ts、.service.ts）。  
服务名  
    风格 02-04  
        坚持使用一致的规则命名服务，以它们的特性来命名。
        坚持为服务的类名加上 Service 后缀。 例如，获取数据或英雄列表的服务应该命名为 DataService 或 HeroService。
引导
    风格 02-05
        坚持把应用的引导程序和平台相关的逻辑放到名为 main.ts 的文件里。
        坚持在引导逻辑中包含错误处理代码。
        避免把应用逻辑放在 main.ts 中，而应放在组件或服务里。
指令选择器
    风格 02-06
        坚持使用中线命名法（dashed-case）或叫烤串命名法（kebab-case）来命名组件的元素选择器。
        例如： templateUrl: './hero-button.component.html' 
为组件添加自定义前缀
    风格 02-07
        坚持使用带连字符的小写元素选择器值（例如 admin-users）。
        坚持为组件选择器添加自定义前缀。 例如，toh 前缀表示 Tour of Heroes（英雄指南），而前缀 `admin 表示管理特性区。
        坚持使用前缀来识别特性区或者应用程序本身。
指令选择器
    风格 02-06
        坚持使用小驼峰形式命名指令的选择器。
为指令添加自定义前缀
    风格 02-08
        坚持为指令的选择器添加自定义前缀（例如前缀 toh 来自 Tour of Heroes）。
        坚持用小驼峰形式拼写非元素选择器，除非该选择器用于匹配原生 HTML 属性。
管道名
    风格 02-09
        坚持为所有管道使用一致的命名约定，用它们的特性来命名。
Angular NgModule 命名
    风格 02-12
        坚持为符号名添加 Module 后缀
        坚持为文件名添加 .module.ts 扩展名。
        坚持用特性名和所在目录命名模块。
类
    风格 03-01
        坚持使用大写驼峰命名法来命名类。
常量
    风格 03-02
        坚持用 const 声明变量，除非它们的值在应用的生命周期内会发生变化。
        考虑 把常量名拼写为小驼峰格式。
        坚持容许现存的const 常量沿用大写蛇形命名法。
接口
    风格 03-03
        坚持使用大写驼峰命名法来命名接口。
        考虑不要在接口名字前面加 I 前缀。
        考虑在服务和可声明对象（组件、指令和管道）中用类代替接口。
        考虑用接口作为数据模型。
属性和方法
    样式 03-04
        坚持使用小写驼峰命名法来命名属性和方法。
        避免为私有属性和方法添加下划线前缀。
导入语句中的空行
    风格 03-06
        坚持在第三方导入和应用导入之间留一个空行。
        考虑按模块名字的字母顺排列导入行。
        考虑在解构表达式中按字母顺序排列导入的东西。

特性模块
    风格 04-09
        坚持为应用中每个明显的特性创建一个 Angular 模块。
        坚持把特性模块放在与特性区同名的目录中（例如 app/heroes）。
        坚持特性模块的文件名应该能反映出特性区的名字和目录（例如 app/heroes/heroes.module.ts）。
        坚持特性模块的符号名应该能反映出特性区、目录和文件名（例如在 app/heroes/heroes.module.ts 中定义 HeroesModule）。
共享特性模块
    风格 04-10
        坚持在 shared 目录中创建名叫 SharedModule 的特性模块（例如在 app/shared/shared.module.ts 中定义 SharedModule）。
        坚持在共享模块中声明那些可能被特性模块引用的可复用组件、指令和管道。
        考虑把可能在整个应用中到处引用的模块命名为 SharedModule
        考虑 不要在共享模块中提供服务。服务通常是单例的，应该在整个应用或一个特定的特性模块中只有一份。 不过也有例外，比如，在下面的范例代码中，注意 SharedModule 提供了 FilterTextService。这里可以这么做，因为该服务是无状态的，也就是说，该服务的消费者不会受到这些新实例的影响。
        坚持在 SharedModule 中导入所有模块都需要的资产（例如 CommonModule 和 FormsModule）。
内联输入和输出属性装饰器
    风格 05-12
        坚持 使用 @Input() 和 @Output()，而非 @Directive 和 @Component 装饰器的 inputs 和 outputs 属性:
        坚持把 @Input() 或者 @Output() 放到所装饰的属性的同一行。
成员顺序
    风格 05-14
        坚持把属性成员放在前面，方法成员放在后面。
        坚持先放公共成员，再放私有成员，并按照字母顺序排列。 
把逻辑放到服务里
    风格 05-15
        坚持在组件中只包含与视图相关的逻辑。所有其它逻辑都应该放到服务中。
        坚持把可重用的逻辑放到服务中，保持组件简单，聚焦于它们预期目的。
单一职责
    风格 07-02
        坚持创建单一职责的服务，用职责封装在它的上下文中。
        坚持当服务成长到超出单一用途时，创建一个新服务。
使用 @Injectable() 类装饰器
    风格 07-04
        坚持当使用类型作为令牌来注入服务的依赖时，使用 @Injectable() 类装饰器，而非 @Inject() 参数装饰器。
通过服务与 Web 服务器通讯
    风格 08-01
        坚持把数据操作和与数据交互的逻辑重构到服务里。
        坚持让数据服务来负责 XHR 调用、本地储存、内存储存或者其它数据操作。
