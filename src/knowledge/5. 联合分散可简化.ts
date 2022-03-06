/**
 * 分布式条件类型
 *
 * 当类型参数为联合类型，并且在条件类型左边直接引用该类型参数的时候，
 * TypeScript 会把每一个元素单独传入来做类型运算，最后再合并成联合类型，这种语法叫做分布式条件类型。
 */
type UppercaseA<Item extends string> = Item extends 'a' ? Uppercase<Item> : Item;
type Union = 'a' | 'b' | 'c';
type UppercaseAResult = UppercaseA<Union>; // "b" | "c" | "A"

type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;

// 当传入联合类型时，会返回 true：
type IsUnionResult1 = IsUnion<'a' | 'b'>;

// 当传入其他类型时，会返回 false：
type IsUnionResult2 = IsUnion<['a' | 'b']>;

// 因为条件类型中如果左边的类型是联合类型，会把每个元素单独传入做计算，而右边不会。
// 如下
type TestUnion<A, B = A> = A extends A ? { a: A; b: B } : never;
type TestUnionResult = TestUnion<'a' | 'b' | 'c'>;
// {
//     a: "a";
//     b: "a" | "b" | "c";
// } | {
//     a: "b";
//     b: "a" | "b" | "c";
// } | {
//     a: "c";
//     b: "a" | "b" | "c";
// }
// 因为条件类型中如果左边的类型是联合类型，会把每个元素单独传入做计算，而右边不会。

// 所以 A 是 'a' 的时候，B 是 'a' | 'b' | 'c'， A 是 'b' 的时候，B 是 'a' | 'b' | 'c'。。。

// 那么利用这个特点就可以实现 Union 类型的判断：

// 类型参数 A、B 是待判断的联合类型，B 默认值为 A，也就是同一个类型。
// A extends A 这段看似没啥意义，主要是为了触发分布式条件类型，让 A 的每个类型单独传入。
// [B] extends [A] 这样不直接写 B 就可以避免触发分布式条件类型，那么 B 就是整个联合类型。
// B 是联合类型整体，而 A 是单个类型，自然不成立，而其它类型没有这种特殊处理，A 和 B 都是同一个，怎么判断都成立。

// 其中有两个点比较困惑，我们重点记一下：

// 当 A 是联合类型时：
// A extends A 这种写法是为了触发分布式条件类型，让每个类型单独传入处理的，没别的意义。
// A extends A 和 [A] extends [A] 是不同的处理，前者是单个类型和整个类型做判断，
// 后者两边都是整个联合类型，因为只有 extends 左边直接是类型参数才会触发分布式条件类型。

type union = ['aaa', 'bbb'][number]; // "aaa" | "bbb"

type BEM<
    Block extends string,
    Element extends string[],
    Modifiers extends string[]
> = `${Block}__${Element[number]}--${Modifiers[number]}`;

// 联合类型遇到字符串也是会单独每个元素单独传入做处理。
// "guang__aaa--warning" | "guang__aaa--success" | "guang__bbb--warning" | "guang__bbb--success"
type bemResult = BEM<'guang', ['aaa', 'bbb'], ['warning', 'success']>;

type Combination<A extends string, B extends string> = A | B | `${A}${B}` | `${B}${A}`;
type AllCombinations<A extends string, B extends string = A> = A extends A
    ? Combination<A, AllCombinations<Exclude<B, A>>>
    : never;

type AllCombinationsResult = AllCombinations<'a' | 'b' | 'c'>;

export {}
