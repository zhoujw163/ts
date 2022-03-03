// 数组元素类型提取
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]] ? First : never;
type GetFirstResult = GetFirst<[1, 2, 3]>; // 1

type ShiftArr<Arr extends unknown[]> = Arr extends [unknown, ...infer Rest] ? Rest : never;
type GetShiftArr = ShiftArr<[1, 2, 3]>; // [2, 3]

// 字符串类型 StartsWith
type StartsWith<Str extends string> = Str extends `${infer Prefix}${string}` ? Prefix : never;
type StartsWithResult = StartsWith<'sad'>; // 's'

// Trim
type TrimRight<S extends string> = S extends `${infer Rest}${' ' | '\n' | '\t'}` ? TrimRight<Rest> : S;
type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer Rest}` ? TrimLeft<Rest> : S;
type TrimResult = TrimLeft<TrimRight<'  abc  '>>; // 'abc'

// 函数。使用 Function 约束泛型需要将 strictFunctionTypes 关闭，否则类型推倒会错误
type CommonFn = (...args: any[]) => any;
type GetParameters<T extends CommonFn> = T extends (...args: infer P) => any ? P : never;
type GetParametersResult = GetParameters<(a: number, b: string) => void>; // [number, string]

type GetThisType<T extends CommonFn> = T extends (this: infer ThisType, ...args: any) => any ? ThisType : never;
type GetThisTypeResult = GetThisType<(this: Window, a: number, b: string) => void>; // Window

// class
type CommonConstructor = new (...args: any[]) => any;
type Person = { name: string };
type TestClass = {
    new (name: string): Person
}
type GetConstructorParameters<T extends CommonConstructor> = T extends new (...args: infer P) => any ? P : never;
type GetConstructorParametersResult = GetConstructorParameters<TestClass> // [name: string]

export {}