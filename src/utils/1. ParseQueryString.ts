// 'a=1&b=2&c=3' => {a: '1', b: '2', c: '3'}

type ParseParam<T extends string> = T extends `${infer K}=${infer V}` ? { [P in K]: V } : {};

type MergeValues<One, Other> = One extends Other
    ? One
    : Other extends unknown[]
    ? [One, ...Other]
    : [One, Other];

type MergeParams<OneParam extends Record<string, any>, OtherParam extends Record<string, any>> = {
    [Key in keyof OneParam | keyof OtherParam]: Key extends keyof OneParam
        ? Key extends keyof OtherParam
            ? MergeValues<OneParam[Key], OtherParam[Key]>
            : OneParam[Key]
        : Key extends keyof OtherParam
        ? OtherParam[Key]
        : never;
};

type MergeParamsResult = MergeParams<{ a: 1 }, { a: 2 }>;

type ParseQueryString<Str extends string> = Str extends `${infer Param}&${infer Rest}`
    ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
    : ParseParam<Str>;
