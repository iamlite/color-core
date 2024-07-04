import { Color } from 'next-colors';
import React from 'react';
import ColorSwatch from './color-swatch';

interface ColorSectionProps {
	title: string;
	colors: Color[];
}

const ColorSection: React.FC<ColorSectionProps> = ({ title, colors }) => (
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

export default ColorSection;
