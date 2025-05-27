
import z from 'zod';
import { RealEstateInput, RealEstateProps } from '@/domain/entities/realEstate/realEstate';
import { Address } from '@/domain/valueObjects/address';
import { Area } from '@/domain/valueObjects/area';
import { Currency, Real } from '@/domain/valueObjects/real';

export function applyRealEstateTransformsAndRefines<T extends z.ZodObject<any>>(
	baseSchema: T
) { 
	return baseSchema
		.transform((data) => {
			
			const inputData = data as RealEstateInput;

			return {
				...inputData,
				totalArea: Area.create(inputData.totalArea.value, inputData.totalArea.unit),
				builtArea: Area.create(inputData.builtArea.value, inputData.builtArea.unit),
				privateArea: Area.create(inputData.privateArea.value, inputData.privateArea.unit),
				fieldArea: Area.create(inputData.fieldArea.value, inputData.fieldArea.unit),
				address: Address.create(inputData.address),
				debits: Real.create(inputData.debits, Currency.BRL),
				startingBid: Real.create(inputData.startingBid, Currency.BRL),
				initialValue: Real.create(inputData.initialValue, Currency.BRL),
			} as RealEstateProps; 
		})
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