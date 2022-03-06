type RemoveTail<T extends string, Tail extends string> = T extends `${infer P}${Tail}` ? P : T;

// prettier-ignore
type RouteParameters<Route extends string> = Route extends `${string}:${infer Rest}`
    ? {
        [P in RemoveTail<Rest, `/${string}`>]: string
    } & ( Rest extends `${RemoveTail<Rest, `/${string}`>}${infer Next}`? RouteParameters<Next> : unknown)
    : {};

type B = RouteParameters<'/showFood/:id/:name/:shopName'>; // {id: string} & {name: string} & {shopName: string}

/**
    // 第一次
    Rest ==> 'id/:name/:shopName'

    RemoveTail<Rest, `/${string}`> ==> 'id'

    // 第二次

    Rest ==> 'name/:shopName'

    RemoveTail<Rest, `/${string}`> ==> 'name'

    // 第三次

    Rest ==> 'shopName'

    RemoveTail<Rest, `/${string}`> ==> 'name'
 */
