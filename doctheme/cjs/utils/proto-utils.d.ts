import { JSX, Reflection, TypeParameterReflection } from 'typedoc';
export declare function bindProps<F, L extends any[], R>(fn: (f: F, ...a: L) => R, first: F): (...r: L) => R;
export declare function classNames(names: Record<string, boolean | null | undefined>, extraCss?: string): string | undefined;
export declare function displayName(ref: Reflection): string;
export declare function hasTypeParameters(ref: Reflection): ref is Reflection & {
    typeParameters: TypeParameterReflection[];
};
export declare function joinElements<T>(joiner: JSX.Children, list: readonly T[], callback: (x: T) => JSX.Children): JSX.Element;
