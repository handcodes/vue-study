// 类型注解
let var1: string;
// var1 = 1 // no ok
var1 = "开课吧";

// 类型推论
let var2 = true;
// var2 = 'true' // no ok

// 类型数组
let arr: string[];
arr = ["tom", "jerry"];

// 任意类型: 不受约束
let varAny: any;
varAny = "str";
varAny = 1;

// any类型也可以用于数组
let anyArr: any[];
anyArr = [1, true, "free"];

// 函数中的类型: 形参和返回值类型约束
function greet(person: string): string {
  return "hello, " + person;
}
function warn(): void {}

// 类型别名
type ObjType = { foo: string; bar: string };
const obj: ObjType = {
  foo: "fooo",
  bar: "barr",
};

// 联合类型：有个变量的类型是多种类型其中之一
let union: string | number;
union = "1";
union = 1;

// 交叉类型：由多种类型合成的类型
type First = { first: number };
type Second = { second: number };
type FirstAndSecond = First & Second;

// 函数
// 1.必填参数: 参数一旦声明就要传入
// 2.可选参数：加个问号，参数变为可选
// 3.默认值
function greeting(person: string, msg: string = ""): string {
  return "...";
}

greeting("tom");

// 函数重载：以参数数量或者类型或返回值类型区分多个同名函数
// 先声明，再实现
function watch(cb1: () => void): void; // 声明
function watch(cb1: () => void, cb2: (v1: any, v2: any) => void): void; // 声明
// 实现
function watch(cb1: () => void, cb2?: (v1: any, v2: any) => void): void {
  if (cb1 && cb2) {
    console.log("执行重载2");
  } else {
    console.log("执行重载1");
  }
}
// watch()

interface Foo {
  foo: string;
}
class Bar implements Foo {
  foo: string = "";
}
class Baz implements Foo {
  foo: string = "";
}
function abc(a: Foo) {
  a.foo;
}

// 泛型
// interface Result {
//   ok: 0 | 1;
//   data: Feature[];
// }

interface Result<T> {
  ok: 0 | 1;
  data: T;
}

// 类装饰器
function log(fn: (key: string) => void) {
  return function (target: Function) {
    target.prototype.log = function (key: string) {
      fn(this[key]);
    };
  };
}

// @log(window.alert)
class Foo2 {
  bar = "bar";
}

// const foo2 = new Foo2()
// @ts-ignore
// foo2.log('bar')

// // 对类的装饰
// function decoratorx1(target) {
//   console.log(target);
// }

// @decoratorx1
// class x1 {

// }

// // 对类的工厂
// function decoratorx2(x: number) {
//   return function (target: Function) {
//     console.log(x, target)
//   }
// }

// @decoratorx2(1)
// class x2 {

// }

// // 对类属性的修饰
// function decoratorx3(target:any, name:any, descriptor:any){
//   console.log(target, name, descriptor)
// }

// class x3 {
//   @decoratorx3
//   name(x:number, y:number) {
//     return x + y
//   }
// }

// function decoratorx4(x) {
//   return function (target:any, name:any, descriptor:any){
//     console.log(x, target, name, descriptor)
//   }
// }

// class x4 {
//   @decoratorx4(10)
//   age() {

//   }
// }

/**
 * 绑定类的方法的this
 */
function bindThis(target: any, name: any, descriptor: any) {
  return {
    configurable: descriptor.configurable,
    enumerable: descriptor.enumerable,
    get() {
      return descriptor.value.bind(this);
    },
  };
}

class bindThisTest {
  constructor(private name: string, private age: number) {

  }

  @bindThis
  getName() {
    return this.name;
  }

  @bindThis
  getAge() {
    return this.age;
  }
}

let test = new bindThisTest('lian', 22);
let getName = test.getName;
let getAge = test.getAge;
console.log(getName());
console.log(getAge());
console.log(test.getName());
console.log(test.getAge());
