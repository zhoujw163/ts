// TypeScript 的 type、infer、类型参数声明的变量都不能修改，想对类型做各种变换产生新的类型就需要重新构造。

// 数组类型的重新构造
// Push
type Push<Arr extends  unknown[], Ele> = [...Arr, Ele];
type PushResult = Push<[1, 2, 3], 4>;

// Unshift
type Unshift<Arr extends  unknown[], Ele> = [Ele, ...Arr];
type UnshiftResult = Unshift<[1, 2, 3], 0>;

// Zip
// Zip<[1,2], ['a', 'b']> ==> [[1, 'a'], [2, 'b']]
type Zip<
    Arr1 extends unknown[],
    Arr2 extends unknown[]
> = Arr1 extends [infer Arr1First, ...infer Arr1Rest]
    ? Arr2 extends [infer Arr2First, ...infer Arr2Rest]
        ? [[Arr1First, Arr2First], ...Zip<Arr1Rest, Arr2Rest>]
        : []
    : [];

type ZipResult = Zip<[1, 2, 3], ['a', 'b', 'c']>;

// CamelCase 无法处理 _出现在起始位置及多个_连着出现情况
type CamelCase<S extends string> = S extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Capitalize<Right>}${CamelCase<Rest>}`
    : S;
type CamelCaseResult = CamelCase<'a_b_c'>;

// DropSubStr
type DropSubStr<S extends string, SubStr extends string> = S extends `${infer Left}${SubStr}${infer Right}`
    ? DropSubStr<`${Left}${Right}`, SubStr>
    : S;
type DropSubStrResult = DropSubStr<'ab1cd1e1f1', '1'>;


// 扩充函数参数
type CommonFn = (...args: any[]) => any;
type AppendArgument<Fn extends CommonFn, P> = Fn extends (...args: infer Args) => infer R
    ? (...args: [...Args, P]) => R
    : never;
type AppendArgumentResult = AppendArgument<(name: string, age: number) => number, boolean>;

// 更改索引类型
type UppercaseKey<T extends object> = {
    [K in keyof T as Uppercase<K & string>] : T[K]
}
type UppercaseKeyResult = UppercaseKey<{name: string}>;

export {}
