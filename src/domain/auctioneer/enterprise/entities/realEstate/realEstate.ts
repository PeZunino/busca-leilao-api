import z from 'zod';
import { Address, addressSchema } from '@/domain/valueObjects/address';
import { Area, AreaUnit } from '@/domain/valueObjects/area';
import { Real } from '@/domain/valueObjects/real';
import { UniqueID } from '@/domain/valueObjects/uniqueId';
import { Good, GoodProps } from '../good';

export interface RealEstateProps extends GoodProps { 
	origin: string;
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

export interface RealEstateInput {
	startingBid: number; 
	description: string;
	observation?: string;
	initialValue: number; 
	origin: string;
	isOccupied: boolean;
	totalArea: { value: number;
		unit: AreaUnit };
	builtArea: { value: number;
		unit: AreaUnit };
	privateArea: { value: number;
		unit: AreaUnit };
	fieldArea: { value: number;
		unit: AreaUnit };
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
	origin: z.string()
		.min(3, 'Origin must be at least 3 characters'),
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


export abstract class RealEstate extends Good { 
	protected constructor(protected readonly props: RealEstateProps, id?: UniqueID) {
		super(props, id); 
	}
	
	public getCategory(): string {
		return 'RealEstate';
	}
	
	get origin(): string {
		return this.props.origin; 
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