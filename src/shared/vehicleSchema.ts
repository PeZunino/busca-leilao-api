
import z from 'zod';

export function applyVehicleTransformsAndRefines<T extends z.ZodObject<any>>(
	baseSchema: T
) { 
	return baseSchema

		.refine((data) => {
			return data.yearModel >= data.year;
		}, {
			message: 'Model year cannot be earlier than manufacture year',
			path: [
				'yearModel'
			],
		});
}