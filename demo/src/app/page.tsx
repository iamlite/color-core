'use client';

import { Color } from 'next-colors';
import { useRef, useState } from 'react';

const ColorSwatch = ({ color, label }: { color: Color; label: string }) => (
	<div className='flex flex-col items-center'>
		<div
			className='w-8 h-8 rounded-full shadow-md border border-gray-200'
			style={{ backgroundColor: color.toHex() }}></div>
		<span className='mt-1 text-xs'>{label}</span>
	</div>
);

const ColorSection = ({ title, colors }: { title: string; colors: Color[] }) => (
	<div className='mb-4'>
		<h3 className='text-sm font-semibold mb-2 text-center'>{title}</h3>
		<div className='flex flex-wrap justify-center gap-2'>
			{colors.map((color, index) => (
				<ColorSwatch
					key={index}
					color={color}
					label={color.toHex()}
				/>
			))}
		</div>
	</div>
);

const ConversionSection = ({ color }: { color: Color }) => {
	const conversions = {
		RGB: color.toRgb(),
		HSL: color.toHsl(),
		HSV: color.toHsv(),
		CMYK: color.toCmyk(),
		LAB: color.toLab(),
		LCH: color.toLch(),
	};

	return (
		<div className='grid grid-cols-2 gap-4 text-xs'>
			{Object.entries(conversions).map(([key, value]) => (
				<div
					key={key}
					className='bg-zinc-200 p-2 rounded'>
					<span className='font-medium block mb-1'>{key}:</span>
					{Object.entries(value).map(([subKey, subValue]) => (
						<div
							key={subKey}
							className='pl-2'>
							<span className='font-medium'>{subKey}: </span>
							<span>{typeof subValue === 'number' ? subValue.toFixed(2) : subValue}</span>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default function Home() {
	const [color, setColor] = useState<Color>(new Color('#916ff6'));
	const [inputValue, setInputValue] = useState('#916ff6');
	const [copied, setCopied] = useState(false);
	const codeRef = useRef<HTMLPreElement>(null);

	const handleColorChange = (newColorValue: string) => {
		setInputValue(newColorValue);
		try {
			const newColor = new Color(newColorValue);
			setColor(newColor);
		} catch (error) {
			console.error('Invalid color input:', error);
		}
	};

	return (
		<div className='min-h-screen bg-zinc-800 text-gray-200 py-8'>
			<div className='max-w-6xl mx-auto px-4'>
				<div className='relative top-4 right-4 text-right'>
					<a
						href='https://github.com/iamlite/next-colors'
						className='inline-block'
						target='_blank'
						rel='noopener noreferrer'>
						<svg
							viewBox='0 0 24 24'
							width='24'
							height='24'
							stroke='currentColor'
							strokeWidth='2'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='text-gray-400 hover:text-white'>
							<path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'></path>
						</svg>
					</a>
				</div>

				<h1 className='text-2xl font-bold mb-4 text-center'>next-colors</h1>

				<div className='mb-4 flex items-center justify-center space-x-2'>
					<input
						type='text'
						value={inputValue}
						onChange={(e) => handleColorChange(e.target.value)}
						className='w-48 p-2 border border-gray-300 rounded text-center text-gray-800'
						placeholder='Enter a color'
					/>
					<input
						type='color'
						value={color.toHex()}
						onChange={(e) => handleColorChange(e.target.value)}
						className='w-10 h-10 rounded cursor-pointer'
					/>
				</div>
				<p className='text-center text-sm mb-4'>
					Enter any valid color format: HEX, RGB, HSL, HSV, CMYK, LAB, or LCH
				</p>

				<div className='flex gap-4'>
					<div className='flex-1 bg-gray-100 text-gray-700 shadow-md rounded-lg p-4'>
						<ColorSection
							title='Base Color'
							colors={[color]}
						/>
						<ConversionSection color={color} />
					</div>

					<div className='flex-1 bg-gray-100 text-gray-700 shadow-md rounded-lg p-4'>
						<h2 className='text-lg font-semibold mb-4 text-center'>Color Harmonies</h2>
						<div className='grid grid-cols-2 gap-6'>
							<ColorSection
								title='Complementary'
								colors={color.complementary()}
							/>
							<ColorSection
								title='Analogous'
								colors={color.analogous()}
							/>
							<ColorSection
								title='Triadic'
								colors={color.triadic()}
							/>
							<ColorSection
								title='Tetradic'
								colors={color.tetradic()}
							/>
							<ColorSection
								title='Split Complementary'
								colors={color.splitComplementary()}
							/>
							<ColorSection
								title='Monochromatic'
								colors={color.monochromatic(5)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
