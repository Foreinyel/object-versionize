import deepCompare from "./deepCompare";
declare type Version = {
    version: Symbol;
};
export declare type ObjectVersion<T> = {
    [K in keyof T]: T[K];
} & {
    __version__: Symbol;
    __version___: Version;
};
declare function objectVersion<T extends object>(some: T): ObjectVersion<T>;
declare function objectVersion<T extends object>(some: T, version: Version): ObjectVersion<T>;
declare function objectVersion<T extends object>(some: T, old?: ObjectVersion<T>): ObjectVersion<T>;
export default objectVersion;
export { deepCompare };
