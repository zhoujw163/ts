const user = {
    userName: '',
    getOrder: [
        {
            orderId: '',
            orderName: ''
        }
    ]
};

const menu = {
    menuId: '',
    meta: [{ title: '' }]
};

// 第一步：联合类型转交叉
type UnionTypeToCrossType<U> = (U extends U ? (k: U) => void : never) extends (k: infer P) => void
    ? P
    : never;

// type UnionTypeToCrossTypeResult = UnionTypeToCrossType<typeof user | typeof menu>;

// 第二步：把多个模块对象 合成 模块集合对象
function moduleCollection<T extends object[]>(...union: T): UnionTypeToCrossType<T[number]> {
    return union.reduce((acc, obj) => ({ ...acc, ...obj }), {}) as any;
}

// 第三步：调用模块集合对象，合并
let moduleCollectionObj = moduleCollection({ user: user }, { menu: menu });
