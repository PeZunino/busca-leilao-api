import { RealEstateDTO } from './create-real-estate.dto';

export interface UnbuiltPropertyDTO extends RealEstateDTO {
	isUrban: boolean;
	hasWaterAccess: boolean;
}
