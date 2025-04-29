import { Entity } from '@/core/entities/entity';
import { Optional } from '@/core/types/optional';

interface Address{
	street:string
	number:string
	cep:string
	neighborhood: string;
	city: string;

}

interface Props{
	street:string
	number:string
	cep:string
	neighborhood: string;
	city: string;
	name: string;
	registrationCode: string;
	phone: string;
	email: string;
	website: string;
	address:Address
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
} 