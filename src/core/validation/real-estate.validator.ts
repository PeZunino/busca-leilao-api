import { z } from 'zod';
import { addressSchema } from '@/modules/auctions/domain/valueObjects/address';
import { AreaUnit } from '@/modules/auctions/domain/valueObjects/area';

const realEstateSchemaValidation = z.object({
	isOccupied: z.boolean(),
	totalArea: z.object({
		value: z.number()
			.positive(),
		unit: z.nativeEnum(AreaUnit) 
	}),
	builtArea: z.object({
		value: z.number()
			.positive(),
		unit: z.nativeEnum(AreaUnit) 
	}),
	privateArea: z.object({
		value: z.number()
			.positive(),
		unit: z.nativeEnum(AreaUnit) 
	}),
	fieldArea: z.object({
		value: z.number()
			.positive(),
		unit: z.nativeEnum(AreaUnit) 
	}),
	debits: z.number()
		.nonnegative('Debits must be a non-negative value'),
	allowVisits: z.boolean(),
	lawsuit: z.boolean(),
	registration: z.string()
		.min(5, 'Registration number is too short')
		.regex(/^\d+$/, 'Registration must contain only digits'),
	address: addressSchema,
	complement: z.string()
		.optional(),
	distanceToMetro: z.number()
		.int()
		.positive('Distance to metro must be a positive integer')
		.optional(),
});

export const createRealEstateValidationSchema = realEstateSchemaValidation
	.refine((data) => {
      
		return data.builtArea.value <= data.totalArea.value;
	}, {
		message: 'Built area cannot be greater than total area',
		path: [
			'builtArea'
		],
	})
	.refine((data) => {
		return data.privateArea.value <= data.totalArea.value;
	}, {
		message: 'Private area cannot be greater than total area',
		path: [
			'privateArea'
		],
	});
	

export const createUnbuiltPropertyValidationSchema = realEstateSchemaValidation.extend({
	isUrban: z.boolean(),
	hasWaterAccess: z.boolean(),
})
	.refine(data => {
		return data.fieldArea.value === data.totalArea.value;
	}, {
		message: 'For an unbuilt property, field area must equal total area',
		path: [
			'fieldArea'
		],
	});

export const createBuiltPropertyValidationSchema = realEstateSchemaValidation.extend({
	hasGarage: z.boolean(),
	numberOfBedrooms: z.number()
		.int()
		.positive()
		.min(1, 'Number of bedrooms must be at least 1'),
});