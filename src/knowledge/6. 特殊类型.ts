// any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any，可以用这个特性判断 any 类型。
type IsAny<T> = 1 extends T & 2 ? true : false;
type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;

// 联合类型作为类型参数出现在条件类型左侧时，会分散成单个类型传入，最后合并
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : false;

// never 作为类型参数出现在条件类型左侧时，会直接返回 never。
// type IsNever1<T> = T extends never ? true : false;
// type IsN = IsNever1<never> // never
type IsNever<T> = [T] extends [never] ? true : false;

// any 作为类型参数出现在条件类型左侧时，会直接返回 trueType 和 falseType 的联合类型。
type TestAny<T> = T extends number ? 1 : 2;
type TestAnyResult = TestAny<any>; // 1 | 2

// 元组类型也是数组类型，但每个元素都是只读的，并且 length 是数字字面量，而数组的 length 是 number。可以用来判断元组类型。
type len = [1, 2, 3]['length']; // 3
type len1 = number[]['length']; // number
type IsTuple<T> = T extends readonly [...params: infer Eles]
    ? NotEqual<Eles['length'], number>
    : false;
type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? false
    : true;

type IsTupleResult = IsTuple<number[]>;

// 类型之间是有大小关系的，比如 A 和 B 的交叉类型 A & B 就比联合类型 A | B 小。
// 函数参数处会发生逆变，也就是类型缩小，可以用来实现联合类型转交叉类型。
type UnionToIntersection<U> = (U extends U ? (x: U) => unknown : never) extends (
    x: infer R
) => unknown
    ? R
    : never;
type UnionToIntersectionResult = UnionToIntersection<{ a: 1 } | { b: 2 }>; // { a: 1 } & { b: 2 }

// 可选索引的值为 undefined 和值类型的联合类型。可以用来过滤可选索引，反过来也可以过滤非可选索引
type obj = { name: string; age?: number; phone?: string };
type GetOption<Obj extends Record<string, any>> = {
    [K in keyof Obj as {} extends Pick<Obj, K> ? K : never]: Obj[K];
};
type GetOptionResult = GetOption<obj>;

type isRequired<Key extends keyof Obj, Obj> = {} extends Pick<Obj, Key> ? never : Key;
type GetRequired<Obj extends Record<string, any>> = {
    [Key in keyof Obj as isRequired<Key, Obj>]: Obj[Key];
};

// 索引类型的索引一般为 string 类型，而可索引签名不是，可以用这个特性过滤掉可索引签名。
type Dong = {
    [key: string]: any;
    sleep(): void;
};

type RemoveIndexSignature<Obj extends Record<string, any>> = {
    [Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key];
};
type RemoveIndexSignatureResult = RemoveIndexSignature<Dong>; // { sleep: () => void }

// keyof 只能拿到 class 的 public 的索引，可以用来过滤出 public 的属性。
