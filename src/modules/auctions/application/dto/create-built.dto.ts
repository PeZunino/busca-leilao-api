import { RealEstateDTO } from './create-real-estate.dto';

export interface BuiltPropertyDTO extends RealEstateDTO {
	hasGarage: boolean;
	numberOfBedrooms: number;
}