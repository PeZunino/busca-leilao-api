
import z from 'zod';

export function applyRealEstateTransformsAndRefines<T extends z.ZodObject<any>>(
	baseSchema: T
) { 
	return baseSchema
		.refine((data) => {
			
			return data.builtArea.toSquareMeters() <= data.totalArea.toSquareMeters();
		}, {
			message: 'Built area cannot be greater than total area',
			path: [
				'builtArea'
			],
		})
		.refine((data) => {
			return data.privateArea.toSquareMeters() <= data.totalArea.toSquareMeters();
		}, {
			message: 'Private area cannot be greater than total area',
			path: [
				'privateArea'
			],
		});
}