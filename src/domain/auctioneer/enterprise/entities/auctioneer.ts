import { AggregateRoot } from '@/core/shared/aggregateRoot';
import { Address } from '../valueObjects/address';
import { Email } from '../valueObjects/email';
import { PhoneNumber } from '../valueObjects/phone';
import { UniqueID } from '../valueObjects/uniqueId';
import { Website } from '../valueObjects/website';

interface Props{
	name: string
	registrationCode: string
	phoneNumber: PhoneNumber
	email: Email
	websites: Website[]
	address:Address
}

export interface AuctioneerInput{
	name: string
	registrationCode: string
	phoneNumber: string
	email: string
	websites: string[]
	address: AddressProps
}

interface AddressProps{
	street:string;
	number:string;
	cep:string;
	neighborhood: string;
	city: string;
	state:string; 
}

export class Auctioneer extends AggregateRoot<Props>{
	public static create(props:AuctioneerInput){
		const email = Email.create(props.email); 

		const phoneNumber = PhoneNumber.create(props.phoneNumber); 

		const address = Address.create({
			cep: props.address.cep,
			city: props.address.city,
			neighborhood: props.address.neighborhood,
			number: props.address.number,
			state: props.address.state,
			street: props.address.street,
		});

		const websites = props.websites.map(url => Website.create(url)); 
    
		return new Auctioneer({
			address,
			email,
			name:props.name,
			phoneNumber,
			registrationCode:props.registrationCode,
			websites
		});
	}

	public equals(other: Auctioneer): boolean {
		if (!(other instanceof Auctioneer)) {
			return false;
		}

		return this.id.equals(other.id);
	}
  
	public setName(newName: string): void {
		this.props.name = newName;
	}

	public setEmail(newEmail: string){
		this.props.email = Email.create(newEmail);
	}
	public setPhoneNumber( newPhoneNumber: string): void {
		this.props.phoneNumber = PhoneNumber.create(newPhoneNumber);
	}

	public setAddress(newAddressProps:AddressProps): void {
		this.props.address = Address.create(newAddressProps);
	}

	public addWebsite(url: string): void {
		const newWebsite = Website.create(url);

		if (!this.props.websites.some(w => w.equals(newWebsite))) {
			this.props.websites.push(newWebsite);
		}
	}

	public removeWebsite(url: string): void {
		try {
			const websiteToRemove = Website.create(url);

			this.props.websites = this.props.websites.filter(w => !w.equals(websiteToRemove));
		} catch {
			console.warn(`Attempted to remove invalid URL: ${url}`);
		}
	}

	get idValue(): UniqueID {
		return this.id;
	}

	get name(): string {
		return this.props.name;
	}

	get registrationCode(): string {
		return this.props.registrationCode;
	}

	get phoneNumber(): PhoneNumber {
		return this.props.phoneNumber;
	}

	get email(): Email {
		return this.props.email;
	}

	get websites(): readonly Website[] {
		return [
			...this.props.websites
		];
	}

	get address(): Address {
		return this.props.address;
	}

}