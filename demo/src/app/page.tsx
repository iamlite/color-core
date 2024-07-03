'use client';

import { Color } from 'next-colors';
import { useEffect, useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

const InstallElement: React.FC = () => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText('npm i next-colors');
		setCopied(true);
		setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
	};

	return (
		<div className='mockup-code w-1/4 my-8'>
			<span className='text-center'>{copied ? 'Copied!' : ''}</span>
			<pre data-prefix='$'>
				<code>npm i next-colors</code>
				<button
					onClick={handleCopy}
					className='text-white px-4 py-2 rounded-full flex items-center space-x-2 absolute top-[40%] right-2'>
					{copied ? <FiCheck size={20} /> : <FiCopy size={20} />}
				</button>
			</pre>
		</div>
	);
};

const ColorSwatch = ({ color, label }: { color: Color; label: string }) => {
	const [isClicked, setIsClicked] = useState(false);

	const handleCopyColor = () => {
		navigator.clipboard.writeText(color.toHex());
		setIsClicked(true);
		setTimeout(() => {
			setIsClicked(false);
		}, 500);
	};

	return (
		<div className='flex flex-col items-center m-1'>
			<div
				className={`h-16 w-16 mask mask-squircle hover:scale-150 transition-transform shadow-md flex items-center justify-center cursor-pointer ${isClicked ? 'animate-pulse' : ''}`}
				style={{ backgroundColor: color.toHex() }}
				onClick={handleCopyColor}>
				<span
					className='text-xs uppercase font-extralight glass p-1 rounded-md'
					style={{ color: color.toHsl().l > 50 ? '#000' : '#fff' }}>
					{isClicked ? 'Copied!' : label}
				</span>
			</div>
		</div>
	);
};

const ColorSection = ({ title, colors }: { title: string; colors: Color[] }) => (
	<div>
		<h3 className='text-lg font-semibold my-4 text-center'>{title}</h3>
		<div className='flex flex-wrap justify-center'>
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
		<div className='grid grid-cols-3 gap-4 text-xs'>
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
	const [backgroundStyle, setBackgroundStyle] = useState({});

	useEffect(() => {
		setBackgroundStyle({
			background: `radial-gradient(circle, ${color.toHex()} 0%, #1f2937 100%)`,
		});
	}, [color]);

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
		<div
			className='min-h-screen py-8 justify-center'
			style={backgroundStyle}>
			<div className='max-w-[90vw] mx-auto px-4'>
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
							className='text-white transition-transform hover:scale-150 duration-500'>
							<path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'></path>
						</svg>
					</a>
				</div>

				<h1 className='text-2xl font-bold mb-4 text-center text-white'>next-colors demo</h1>

				<div className='my-6 flex items-center justify-center space-x-2'>
					<label className='input input-bordered rounded-2xl flex items-center gap-2'>
						{'>'}
						<input
							type='text'
							className='grow'
							value={inputValue}
							onChange={(e) => handleColorChange(e.target.value)}
							placeholder='Enter a color'
						/>
					</label>

					<input
						type='color'
						value={color.toHex()}
						onChange={(e) => handleColorChange(e.target.value)}
						style={{ backgroundColor: color.toHex() }}
						className='w-10 h-10 mask mask-squircle cursor-pointer shadow'
					/>
				</div>

				<p className='text-center text-sm mb-4 text-white'>
					Enter any valid color format: HEX, RGB, HSL, HSV, CMYK, LAB, or LCH
				</p>

				<div className='flex flex-col md:flex-row gap-4'>
					<div className='flex-1 bg-white bg-opacity-90 text-gray-700 shadow-md rounded-lg p-4'>
						<ColorSection
							title='Base Color'
							colors={[color]}
						/>
						<div className='py-2' />
						<ConversionSection color={color} />
					</div>

					<div className='flex-1 bg-white bg-opacity-90 text-gray-700 shadow-md rounded-lg py-4'>
						<h2 className='text-lg font-semibold my-4 text-center'>Color Harmonies</h2>
						<div className='grid grid-cols-4 gap-4'>
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
				<div className='flex justify-center'>
					<InstallElement />
				</div>
			</div>
		</div>
	);
}
