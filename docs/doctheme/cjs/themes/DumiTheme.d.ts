import { DefaultTheme, type PageEvent, type Reflection } from 'typedoc';
import { DumiThemeRenderContext } from '../contexts/DumiThemeRenderContext';
export declare class DumiTheme extends DefaultTheme {
    getRenderContext(event: PageEvent<Reflection>): DumiThemeRenderContext;
}
