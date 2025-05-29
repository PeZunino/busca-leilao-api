
import { Entity } from '../../../../../core/shared/entity';
import { Address } from '../../valueObjects/address';
import { Area} from '../../valueObjects/area';
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

export abstract class RealEstate extends Entity<RealEstateProps> { 
	protected constructor(protected readonly props: RealEstateProps, id?: UniqueID) {
		super(props, id); 
	}
	
	get category(){
		return this.category;
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