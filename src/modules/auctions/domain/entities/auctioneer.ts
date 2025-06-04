import { AggregateRoot } from '@/core/shared/aggregateRoot';
import { Address } from '../valueObjects/address';
import { Email } from '../valueObjects/email';
import { PhoneNumber } from '../valueObjects/phone';
import { UniqueID } from '../valueObjects/uniqueId';
import { Website } from '../valueObjects/website';

interface AuctioneerProps{
	name: string
	registrationCode: string
	phoneNumber: PhoneNumber
	email: Email
	address:Address
	websites: Website[]
	createdAt:Date;
	updatedAt?:Date | null;
}

interface AddressProps{
	street:string;
	number:string;
	cep:string;
	neighborhood: string;
	city: string;
	state:string; 
}

export class Auctioneer extends AggregateRoot<AuctioneerProps>{
	public static create(props:AuctioneerProps, id?: UniqueID){

		return new Auctioneer(props, id);
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

	get websites(): Website[] {
		return this.props.websites;
	
	}

	get address(): Address {
		return this.props.address;
	}

	
	get createdAt(){
		return this.props.createdAt;
	}

	get updatedAt(){
		return this.props.updatedAt;
	}
}