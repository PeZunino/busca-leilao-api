
import z from 'zod';
import { VehicleInput, VehicleProps } from '@/domain/auctioneer/enterprise/entities/vehicle/vehicle';
import { Currency,Real } from '@/domain/auctioneer/enterprise/valueObjects/real';

export function applyVehicleTransformsAndRefines<T extends z.ZodObject<any>>(
	baseSchema: T
) { 
	return baseSchema
		.transform((data) => {
			const inputData = data as VehicleInput; 

			return {
				...inputData,
				startingBid: Real.create(inputData.startingBid, Currency.BRL),
				initialValue: Real.create(inputData.initialValue, Currency.BRL),
			} as VehicleProps; 
		})
		.refine((data) => {
			
			
			return data.yearModel >= data.year;
		}, {
			message: 'Model year cannot be earlier than manufacture year',
			path: [
				'yearModel'
			],
		});
}