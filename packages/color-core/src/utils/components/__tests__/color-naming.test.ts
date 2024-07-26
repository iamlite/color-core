import axios from 'axios'
import { Color } from '../../../color'
import { colorInfoCache, getColorInfo, getColorName } from '../color-naming'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Color Naming Module', () => {
  beforeEach(() => {
    colorInfoCache.disableCache()
    colorInfoCache.clear()
    jest.clearAllMocks()
  })

  afterEach(() => {
    colorInfoCache.enableCache()
  })

  describe('getColorName', () => {
    it('should return the correct color name for a valid color', async () => {
      const mockResponse = {
        data: {
          colors: [{ name: 'Cerulean Blue' }]
        }
      }
      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const color = new Color('#007BA7')
      const result = await getColorName(color)

      expect(result).toBe('Cerulean Blue')
      expect(mockedAxios.get).toHaveBeenCalledWith('https://api.color.pizza/v1/?values=007ba7')
    })

    it('should return "Unknown" if the API call fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'))

      const color = new Color('#FF0000')
      const result = await getColorName(color)

      expect(result).toBe('Unknown')
      expect(mockedAxios.get).toHaveBeenCalledWith('https://api.color.pizza/v1/?values=ff0000')
    })

    it('should handle colors with alpha channel correctly', async () => {
      const mockResponse = {
        data: {
          colors: [{ name: 'Red' }]
        }
      }
      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const color = new Color('#FF0000')
      const result = await getColorName(color)

      expect(result).toBe('Red')
      expect(mockedAxios.get).toHaveBeenCalledWith('https://api.color.pizza/v1/?values=ff0000')
    })
  })

  describe('getColorInfo', () => {
    it('should return full color information for a valid color', async () => {
      const mockResponse = {
        data: {
          colors: [
            {
              name: 'Forest Green',
              hex: '#228b22',
              rgb: { r: 34, g: 139, b: 34 },
              hsl: { h: 120, s: 61, l: 34 },
              luminance: 0.2,
              requestedHex: '228b22'
            }
          ]
        }
      }
      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const color = new Color('#228B22')
      const result = await getColorInfo(color)

      expect(result).toEqual(mockResponse.data.colors[0])
      expect(mockedAxios.get).toHaveBeenCalledWith('https://api.color.pizza/v1/?values=228b22')
    })

    it('should throw an error if the API call fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'))

      const color = new Color('#00FF00')
      await expect(getColorInfo(color)).rejects.toThrow('Failed to fetch color information')
      expect(mockedAxios.get).toHaveBeenCalledWith('https://api.color.pizza/v1/?values=00ff00')
    })

    it('should handle edge case colors correctly', async () => {
      const mockResponse = {
        data: {
          colors: [
            {
              name: 'Black',
              hex: '#000000',
              rgb: { r: 0, g: 0, b: 0 },
              hsl: { h: 0, s: 0, l: 0 },
              luminance: 0,
              requestedHex: '000000'
            }
          ]
        }
      }
      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const color = new Color('#000000')
      const result = await getColorInfo(color)

      expect(result).toEqual(mockResponse.data.colors[0])
      expect(mockedAxios.get).toHaveBeenCalledWith('https://api.color.pizza/v1/?values=000000')
    })
  })

  describe('Error handling', () => {
    it('should handle network errors gracefully', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'))

      const color = new Color('#FFFFFF')
      const result = await getColorName(color)

      expect(result).toBe('Unknown')
      expect(mockedAxios.get).toHaveBeenCalledWith('https://api.color.pizza/v1/?values=ffffff')
    })

    it('should handle unexpected API response formats', async () => {
      const mockResponse = {
        data: {
          // Missing 'colors' array
        }
      }
      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const color = new Color('#CCCCCC')
      const result = await getColorName(color)

      expect(result).toBe('Unknown')
      expect(mockedAxios.get).toHaveBeenCalledWith('https://api.color.pizza/v1/?values=cccccc')
    })
  })

  describe('Performance', () => {
    it('should handle multiple rapid requests', async () => {
      const mockResponse = (hex: string) => ({
        data: {
          colors: [{ name: `Color ${hex}` }]
        }
      })

      mockedAxios.get
        .mockResolvedValueOnce(mockResponse('ff0000'))
        .mockResolvedValueOnce(mockResponse('00ff00'))
        .mockResolvedValueOnce(mockResponse('0000ff'))

      const colors = [new Color('#FF0000'), new Color('#00FF00'), new Color('#0000FF')]
      const promises = colors.map(getColorName)
      const results = await Promise.all(promises)

      expect(results).toEqual(['Color ff0000', 'Color 00ff00', 'Color 0000ff'])
      expect(mockedAxios.get).toHaveBeenCalledTimes(3)
      expect(mockedAxios.get).toHaveBeenNthCalledWith(1, 'https://api.color.pizza/v1/?values=ff0000')
      expect(mockedAxios.get).toHaveBeenNthCalledWith(2, 'https://api.color.pizza/v1/?values=00ff00')
      expect(mockedAxios.get).toHaveBeenNthCalledWith(3, 'https://api.color.pizza/v1/?values=0000ff')
    })
  })

  describe('Cache', () => {
    it('should expire cache entries after the specified duration', async () => {
      colorInfoCache.enableCache()
      colorInfoCache.setCacheDuration(100) // Set cache duration to 100ms for testing

      const mockResponse = {
        data: {
          colors: [{ name: 'Test Red', hex: '#ff0000' }]
        }
      }

      mockedAxios.get.mockResolvedValue(mockResponse)

      const color = new Color('#FF0000')

      // First call should make an API request
      await getColorInfo(color)
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)

      // Second immediate call should use cached data
      await getColorInfo(color)
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)

      // Wait for cache to expire
      await new Promise(resolve => setTimeout(resolve, 150))

      // This call should make a new API request due to expired cache
      await getColorInfo(color)
      expect(mockedAxios.get).toHaveBeenCalledTimes(2)
    })
  })
})
