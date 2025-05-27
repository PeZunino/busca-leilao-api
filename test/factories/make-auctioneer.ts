import { fakerPT_BR as faker } from '@faker-js/faker';
import { Auctioneer } from '@/domain/auctioneer/enterprise/entities/auctioneer';
import { Address } from '@/domain/auctioneer/enterprise/valueObjects/address';
import { getBRStateAbbreviated } from './generateBRStateAbbreviated';
import { generateValidBRPhone } from './generatedBRPhone';


export function makeAuctioneer():Auctioneer {
	const email = faker.internet.email();

	const name = faker.person.fullName();

	const phoneType = faker.helpers.arrayElement([
		'mobile', 'landline'
	]) as 'mobile' | 'landline';

	const phoneNumber = generateValidBRPhone(phoneType);


	const registrationCode = String(faker.number.int({ max: 5 }));

	const websites = [
		faker.internet.domainName()
	];

	const cep = faker.location.zipCode();

	const city = faker.location.city();

	const neighborhood = faker.location.street();

	const number = faker.location.buildingNumber();

	const street = faker.location.street();

	const state = getBRStateAbbreviated();

	return Auctioneer.create({
		email: email,
		name,
		phoneNumber: phoneNumber,
		registrationCode,
		websites,
		address: Address.create({
			cep,
			city,
			neighborhood,
			number,
			state,
			street,
		})
	});
}