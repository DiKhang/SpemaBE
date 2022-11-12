/** @format */

interface Validator {
  name: string;
  type:
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object"
    | "function";
  isRequire?: boolean;
  regExp?: RegExp;
}

export { Validator };
