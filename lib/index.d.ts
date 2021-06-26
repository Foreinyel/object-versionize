import deepCompare from "./deepCompare";
declare type Version = {
    version: Symbol;
};
declare type ObjectVersion = {
    __version__: Symbol;
    __version___: Version;
    [k: string]: any;
};
declare function objectVersion(some: Object): object;
declare function objectVersion(some: Object, version: Version): object;
declare function objectVersion(some: Object, old?: ObjectVersion): object;
export default objectVersion;
export { deepCompare };
