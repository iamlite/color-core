import axios from 'axios';
import { Color } from '../../color';

export interface RGBColor {
    r: number;
    g: number;
    b: number;
}

export interface HSLColor {
    h: number;
    s: number;
    l: number;
}

export interface ColorInfo {
    name: string;
    hex: string;
    rgb: RGBColor;
    hsl: HSLColor;
    luminance: number;
    requestedHex: string;
}

export interface ColorNamingResponse {
    colors: ColorInfo[];
    paletteTitle: string;
}

interface CacheEntry {
    info: ColorInfo;
    timestamp: number;
}


class ColorInfoCache {
    private cache: Map<string, CacheEntry> = new Map();
    private cacheDuration: number = 5 * 60 * 1000; // 5 minutes
    private useCache: boolean = true;

    /**
     * Sets the color information for a given hex code in the cache if caching is enabled.
     *
     * @param {string} hex - The hex code of the color.
     * @param {ColorInfo} info - The color information to be stored.
     * @return {void} This function does not return anything.
     */
    set(hex: string, info: ColorInfo): void {
        if (this.useCache) {
            this.cache.set(hex, { info, timestamp: Date.now() });
        }
    }

    /**
     * Sets the duration for which color information will be cached.
     *
     * @param {number} duration - The duration in milliseconds.
     * @return {void} This function does not return anything.
     */
    setCacheDuration(duration: number): void {
        this.cacheDuration = duration;
    }

    /**
     * Retrieves the cached ColorInfo object for the given hex code.
     *
     * @param {string} hex - The hex code to retrieve the ColorInfo object for.
     * @return {ColorInfo | null} The cached ColorInfo object if it exists and is not expired, otherwise null.
     */
    get(hex: string): ColorInfo | null {
        if (!this.useCache) return null;

        const entry = this.cache.get(hex);
        if (!entry) return null;

        if (Date.now() - entry.timestamp > this.cacheDuration) {
            this.cache.delete(hex);
            return null;
        }

        return entry.info;
    }

    /**
     * Enables the caching mechanism by setting the 'useCache' flag to true.
     */
    enableCache(): void {
        this.useCache = true;
    }

    /**
     * Disables the cache by setting 'useCache' to false.
     */
    disableCache(): void {
        this.useCache = false;
    }

    /**
     * Clears the cache of color information.
     */
    clear(): void {
        this.cache.clear();
    }
}

export const colorInfoCache = new ColorInfoCache();

/**
 * Asynchronously retrieves the name of a color from the Color Pizza API.
 *
 * @param {Color} color - The color object to get the name for.
 * @return {Promise<string>} A promise that resolves to the name of the color, or 'Unknown' if an error occurs.
 */
export async function getColorName(color: Color): Promise<string> {
    try {
        const colorInfo = await getColorInfo(color);
        return colorInfo.name;
    } catch (error) {
        console.error('Error fetching color name:', error);
        return 'Unknown';
    }
}

/**
 * Asynchronously fetches color information from the ColorNaming API for a given color.
 *
 * @param {Color} color - The color object for which to fetch information.
 * @return {Promise<ColorInfo>} A promise that resolves to the color information.
 * @throws {Error} If the API call fails.
 */
export async function getColorInfo(color: Color): Promise<ColorInfo> {
    const hex = color.toHex().slice(1);
    const cachedInfo = colorInfoCache.get(hex);

    if (cachedInfo) {
        return cachedInfo;
    }

    try {
        const response = await axios.get<ColorNamingResponse>(`https://api.color.pizza/v1/?values=${hex}`);
        const colorInfo = response.data.colors[0];
        colorInfoCache.set(hex, colorInfo);
        return colorInfo;
    } catch (error) {
        console.error('Error fetching color info:', error);
        throw new Error('Failed to fetch color information');
    }
}