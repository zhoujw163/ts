type GetPromise<T extends Promise<unknown>> = T extends Promise<infer P>
    ? P extends Promise<unknown>
        ? GetPromise<P>
        : P
    : T;

type GetPromiseResult = GetPromise<Promise<Promise<Promise<{ name: string }>>>>;

// 翻转数组
type ReverseArray<T extends unknown> = T extends [infer First, ...infer Rest]
    ? [...ReverseArray<Rest>, First]
    : T;
type ReverseArrayResult = ReverseArray<[1, 2, 3, 4, 5]>;

// includes  此处的 IsEqual 无法处理 any
type IsEqual<T, U> = (T extends U ? true : false) & (U extends T ? true : false);
type Includes<T extends unknown[], FindItem> = T extends [infer First, ...infer Rest]
    ? IsEqual<First, FindItem> extends true
        ? true
        : Includes<Rest, FindItem>
    : false;

type IncludesResult = Includes<[1, 2, 3, 4, 5], 3>;

// RemoveItem
type Remove<T extends unknown[], FindItem, R extends unknown[]> = T extends [
    infer First,
    ...infer Rest
]
    ? IsEqual<First, FindItem> extends true
        ? Remove<Rest, FindItem, R>
        : Remove<Rest, FindItem, [...R, First]>
    : R;

type RemoveResult = Remove<[1, 2, 3, 4, 5, 3], 3, []>;

// ReplaceAll
type ReplaceStr<
    S extends string,
    From extends string,
    To extends string
> = S extends `${infer Prefix}${From}${infer Suffix}`
    ? ReplaceStr<`${Prefix}${To}${Suffix}`, From, To>
    : S;

type ReplaceStrResult = ReplaceStr<'ab1cd1e1f1', '1', '2'>;

type StringToUnion<Str extends string> = Str extends `${infer First}${infer Rest}`
    ? First | StringToUnion<Rest>
    : never;

// 对象类型的递归
type obj = {
    a: {
        b: {
            c: {
                f: () => 'dong';
                d: {
                    e: {
                        q: string;
                    };
                };
            };
        };
    };
};
type DeepReadonly<Obj extends Record<string, any>> = {
    readonly [Key in keyof Obj]: Obj[Key] extends object
        ? Obj[Key] extends Function
            ? Obj[Key]
            : DeepReadonly<Obj[Key]>
        : Obj[Key];
};

type DeepReadonlyResult1 = DeepReadonly<obj>;
type DeepReadonlyResult2 = DeepReadonly<obj>['a'];
type DeepReadonlyResult3 = DeepReadonlyResult2['b'];
type DeepReadonlyResult4 = DeepReadonlyResult3['c'];

export {};
