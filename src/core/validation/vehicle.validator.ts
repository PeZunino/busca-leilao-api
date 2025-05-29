import { z } from 'zod';

const carSpecificInputSchema = z.object({
	hasAirConditioning: z.boolean(),
	steeringType: z.string()
		.min(3, 'Steering type must be at least 3 characters'),
	hasSpareTire: z.boolean(),
	gearbox: z.string()
		.min(3, 'Gearbox type must be at least 3 characters'),
	hasArmor: z.boolean(),
	numberOfDoors: z.number()
		.int()
		.positive()
		.min(2)
		.max(5, 'Number of doors must be between 2 and 5'),
	type: z.string()
		.min(2, 'Car type must be at least 2 characters'), 
});

const baseVehicleInputSchema = z.object({

	mount: z.string()
		.min(3, 'Mount must be at least 3 characters'),
	mileage: z.number()
		.nonnegative('Mileage must be a non-negative integer'),
	hasKeys: z.boolean(),
	licensePlate: z.string(),
	color: z.string()
		.min(2, 'Color must be at least 2 characters'),
	brand: z.string()
		.min(2, 'Brand must be at least 2 characters'),
	model: z.string()
		.min(2, 'Model must be at least 2 characters'),
	version: z.string()
		.min(1, 'Version must be at least 1 character'),
	year: z.date()
		.refine((date) => date.getFullYear() >= 1900, {message: 'Year must be 1900 or later'}),
	yearModel: z.date()
		.refine((date) => date.getFullYear() >= 1900, {message: 'Year model must be 1900 or later'}),
	forCirculation: z.boolean(),
	fuel: z.string()
		.min(2, 'Fuel type must be at least 2 characters')
});

const motorcycleSpecificInputSchema = z.object({});

export const createMotorcycleValidationSchema = baseVehicleInputSchema.extend(motorcycleSpecificInputSchema.shape);

export const createCarValidationSchema = baseVehicleInputSchema.extend(carSpecificInputSchema.shape);
