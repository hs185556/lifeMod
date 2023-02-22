import Base from './baseMixin'
// 基于glob自动化导入
const attrModules = import.meta.glob("./*AttrMixin.ts", {
  import: "default",
  eager: true,
});
const mehodModules = import.meta.glob("./*MethodMixin.ts", {
  import: "default",
  eager: true,
});

let Foo = Base
Object.values(attrModules).map((val) => {
  Foo = val(Foo)
})
Object.values(mehodModules).map(val => {
  Foo = val(Foo)
})

export default Foo;
