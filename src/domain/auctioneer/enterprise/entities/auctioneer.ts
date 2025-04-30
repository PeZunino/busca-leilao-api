import { Entity } from '@/core/entities/entity';
import { Optional } from '@/core/types/optional';

interface Props{
	name: string;
	registrationCode: string;
	phone: string;
	email: string;
	website: string;
	street:string
	number:string
	cep:string
	neighborhood: string;
	city: string;
	createdAt: Date
	updatedAt?: Date | null
}


export class Auctioneer extends Entity<Props>{

	static create(
		props:Optional<Props, 'createdAt'>
	){
		const auctioneer = new Auctioneer({
			...props,
			createdAt: props.createdAt ?? new Date(),
		});

		return auctioneer;
	}

	get name(){
		return this.props.name;
	}
	get registrationCode(){
		return this.props.registrationCode;
	}
	get phone(){
		return this.props.phone;
	}
	get email(){
		return this.props.email;
	}
	get website(){
		return this.props.website;
	}
	get street(){
		return this.props.street;
	}
	get number(){
		return this.props.number;
	}
	get cep(){
		return this.props.cep;
	}
	get neighborhood(){
		return this.props.neighborhood;
	}
	get city(){
		return this.props.city;
	}
	get createdAt(){
		return this.props.createdAt;
	}
	get updatedAt(){
		return this.props.updatedAt;
	}
} 