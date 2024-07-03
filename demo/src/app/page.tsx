'use client';

import { Color } from 'next-colors';
import { useEffect, useState } from 'react';
import { FaNpm } from 'react-icons/fa';
import { FiCheck, FiCopy, FiFileText, FiGithub } from 'react-icons/fi';

const InstallElement: React.FC = () => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText('npm i next-colors');
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className='mockup-code w-1/4 my-8'>
			<pre data-prefix='$'>
				<code>npm i next-colors</code>
				<button
					onClick={handleCopy}
					className='text-white px-4 py-2 rounded-full flex items-center space-x-2 absolute top-[40%] right-2'>
					{copied ? <FiCheck size={20} /> : <FiCopy size={20} />}
					<span className='text-center'>{copied ? 'Copied!' : ''}</span>
				</button>
			</pre>
		</div>
	);
};

const ColorSwatch = ({ color }: { color: Color }) => {
	return (
		<div
			className='relative h-8 w-8 m-1 rounded-lg shadow-md cursor-pointer tooltip tooltip-bottom hover:scale-125 transition-transform duration-500 uppercase'
			data-tip={color.toHex()}
			style={{ backgroundColor: color.toHex() }}
			onClick={() => navigator.clipboard.writeText(color.toHex())}></div>
	);
};

const ColorSection = ({ title, colors }: { title: string; colors: Color[] }) => (
	<div className='mb-4'>
		<h3 className='text-sm font-semibold my-2 text-center'>{title}</h3>
		<div className='flex justify-center'>
			{colors.map((color, index) => (
				<ColorSwatch
					key={index}
					color={color}
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
		XYZ: color.toXyz(),
		YUV: color.toYuv(),
	};

	return (
		<div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-xs'>
			{Object.entries(conversions).map(([key, value]) => (
				<div
					key={key}
					className='bg-zinc-200 px-6 py-6 rounded flex flex-col items-center'>
					<span className='block mb-4 text-center w-full'>{key}:</span>
					{Object.entries(value).map(([subKey, subValue]) => (
						<div
							key={subKey}
							className='pl-2 w-full flex justify-between'>
							<span className='font-bold'>{subKey}: </span>
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
						href='https://www.npmjs.com/package/next-colors'
						className='inline-block mx-2 tooltip tooltip-bottom'
						target='_blank'
						rel='noopener noreferrer'
						data-tip='NPM'>
						<FaNpm
							size={24}
							className='text-white transition-transform hover:scale-150 duration-500'
						/>
					</a>
					<a
						href='https://github.com/iamlite/next-colors'
						className='inline-block mx-2 tooltip tooltip-bottom'
						target='_blank'
						rel='noopener noreferrer'
						data-tip='GitHub'>
						<FiGithub
							size={24}
							className='text-white transition-transform hover:scale-150 duration-500 '
						/>
					</a>

					<a
						href='https://iamlite.github.io/next-colors/'
						className='inline-block mx-2 tooltip tooltip-bottom'
						target='_blank'
						rel='noopener noreferrer'
						data-tip='Documentation'>
						<FiFileText
							size={24}
							className='text-white transition-transform hover:scale-150 duration-500 '
						/>
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
						<div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
							<ColorSection
								title='Monochromatic'
								colors={color.monochromatic(5)}
							/>
							<ColorSection
								title='Shades'
								colors={color.shades()}
							/>
							<ColorSection
								title='Tints'
								colors={color.tints()}
							/>
							<ColorSection
								title='Tones'
								colors={color.tones()}
							/>
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
								title='Split Complementary'
								colors={color.splitComplementary()}
							/>
							<ColorSection
								title='Compound'
								colors={color.compound()}
							/>
							<ColorSection
								title='Tetradic'
								colors={color.tetradic()}
							/>
							<ColorSection
								title='Double Split Complementary'
								colors={color.doubleSplitComplementary()}
							/>
							<ColorSection
								title='Square'
								colors={color.square()}
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
