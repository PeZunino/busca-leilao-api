import z from 'zod';
import { Entity } from '../../../../../core/shared/entity';
import { Address, addressSchema } from '../../valueObjects/address';
import { Area, AreaUnit } from '../../valueObjects/area';
import { Real } from '../../valueObjects/real';
import { UniqueID } from '../../valueObjects/uniqueId';

export interface RealEstateProps { 
	isOccupied: boolean;
	totalArea: Area;
	builtArea: Area;
	privateArea: Area;
	fieldArea: Area;
	debits: Real;
	allowVisits: boolean;
	lawsuit: boolean;
	registration: string;
	address: Address;
	complement?: string;
	distanceToMetro?: number;
}

export interface RealEstateDTO {
	isOccupied: boolean;
	totalArea: { value: number;
		unit: string };
	builtArea: { value: number;
		unit: string };
	privateArea: { value: number;
		unit: string };
	fieldArea: { value: number;
		unit: string };
	debits: number; 
	allowVisits: boolean;
	lawsuit: boolean;
	registration: string;
	address: z.infer<typeof addressSchema>;
	complement?: string;
	distanceToMetro?: number;
}

export const baseRealEstateInputSchema = z.object({
	startingBid: z.number()
		.positive('Starting bid must be positive'),
	description: z.string()
		.min(10, 'Description must be at least 10 characters'),
	observation: z.string()
		.optional(),
	initialValue: z.number()
		.positive('Initial value must be positive'),
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

export function baseRealEstateInputSchemaRefine(baseSchema:z.ZodObject<any>){
	return baseSchema.refine((data) => {
			
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

export abstract class RealEstate extends Entity<RealEstateProps> { 
	protected constructor(protected readonly props: RealEstateProps, id?: UniqueID) {
		super(props, id); 
	}
	
	public getCategory(): string {
		return 'RealEstate';
	}
	
	get isOccupied(): boolean {
		return this.props.isOccupied; 
	}
	get totalArea(): Area {
		return this.props.totalArea; 
	}
	get builtArea(): Area {
		return this.props.builtArea; 
	}
	get privateArea(): Area {
		return this.props.privateArea; 
	}
	get fieldArea(): Area {
		return this.props.fieldArea; 
	}
	get debits(): Real {
		return this.props.debits; 
	} 
	get allowVisits(): boolean {
		return this.props.allowVisits; 
	}
	get lawsuit(): boolean {
		return this.props.lawsuit; 
	}
	get registration(): string {
		return this.props.registration; 
	}
	get address(): Address {
		return this.props.address; 
	}
	get complement(): string | undefined {
		return this.props.complement; 
	}
	get distanceToMetro(): number | undefined {
		return this.props.distanceToMetro; 
	}
}