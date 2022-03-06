// TypeScript 类型系统中没有加减乘除运算符，但是可以通过构造不同的数组然后取 length 的方式来完成数值计算，把数值的加减乘除转化为对数组的提取和构造。

// 数组长度实现加减乘除

// Add: 比如 3 + 2，就是构造一个长度为 3 的数组类型，再构造一个长度为 2 的数组类型，然后合并成一个数组，取 length。
type BuildArray<
    Len extends number,
    E = unknown,
    Arr extends unknown[] = []
> = Arr['length'] extends Len ? Arr : BuildArray<Len, E, [...Arr, E]>;

type Add<N1 extends number, N2 extends number> = [...BuildArray<N1>, ...BuildArray<N2>]['length'];
type AddResult = Add<32, 21>;

// Subtract
type Subtract<N1 extends number, N2 extends number> = BuildArray<N1> extends [
    ...BuildArray<N2>,
    ...infer Rest
]
    ? Rest['length']
    : never;
type SubtractResult = Subtract<32, 21>;

// Multiply
type Multiply<N1 extends number, N2 extends number, R extends unknown[] = []> = N2 extends 0
    ? R['length']
    : Multiply<N1, Subtract<N2, 1>, [...BuildArray<N1>, ...R]>;
type MultiplyResult = Multiply<31, 4>;

// Divide
type Divide<N1 extends number, N2 extends number, R extends unknown[] = []> = N1 extends 0
    ? R['length']
    : Divide<Subtract<N1, N2>, N2, [unknown, ...R]>;

type DivideResult = Divide<9, 3>;
