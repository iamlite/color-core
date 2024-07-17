import { DefaultThemeRenderContext } from 'typedoc';
export declare class DumiThemeRenderContext extends DefaultThemeRenderContext {
    toolbar: (event: import("typedoc").PageEvent<import("typedoc").Reflection>) => import("typedoc/dist/lib/utils/jsx.elements").JsxElement;
    sidebarLinks: () => import("typedoc/dist/lib/utils/jsx.elements").JsxElement | null;
    header: (event: import("typedoc").PageEvent<import("typedoc").Reflection>) => import("typedoc/dist/lib/utils/jsx.elements").JsxElement;
    navigation: (event: import("typedoc").PageEvent<import("typedoc").Reflection>) => import("typedoc/dist/lib/utils/jsx.elements").JsxElement;
    footer: () => import("typedoc/dist/lib/utils/jsx.elements").JsxElement;
}
