/**
 * @description 字符串下划线转成驼峰
 *
 * @example '__abc__def_ghi_' => 'abcDefGhi'
 */

// 1. 将字符串按 "_" 分割 abc__def_ghi_ ==> ['abc', '', 'def', 'ghi', '']
type WordSeparator = '_' | '-' | ',';

type Split<
    S extends string,
    Delimiter extends string
> = S extends `${infer Head}${Delimiter}${infer Tail}` ? [Head, ...Split<Tail, Delimiter>] : [S];

// 2. 将每项首字母转成大写再拼接成字符串

// type a = Split<'abc__def_ghi_', '_'>;

// prettier-ignore
type InnerCamelCaseStringArray<Parts extends any[], PreviousPart> = Parts extends [
    `${infer FirstPart}`,
    ...infer RemainingParts
]
    ? FirstPart extends undefined // 处理空数组情况
        ? ''
        : FirstPart extends '' // 处理空字符串情况
            ? InnerCamelCaseStringArray<RemainingParts, PreviousPart>
            : `${PreviousPart extends ''
                ? FirstPart
                : Capitalize<FirstPart>}${InnerCamelCaseStringArray<RemainingParts, FirstPart>}`
    : '';

// type b = InnerCamelCaseStringArray<a, ''>;

type CamelCaseStringArray<Parts extends string[]> = Parts extends [
    `${infer FirstPart}`,
    ...infer RemainingParts
]
    ? `${Uncapitalize<FirstPart>}${InnerCamelCaseStringArray<RemainingParts, FirstPart>}`
    : never;

// type c = CamelCaseStringArray<a>;

type CamelCase<S extends string, D extends string = WordSeparator> = CamelCaseStringArray<
    Split<S extends Uppercase<S> ? Lowercase<S> : S, D>
>;

type d = CamelCase<'__abc__def_ghi_'>;

export {};
