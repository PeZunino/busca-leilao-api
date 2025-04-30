import { faker } from '@faker-js/faker';

export function makeAuctioneer() {
	return {
		email: faker.internet.email(),
		name: faker.person.fullName(),
		phone: faker.phone.number({ style: 'national' }),
		registrationCode: String(faker.number.int({ max: 5 })),
		website: faker.internet.domainName(),
		cep: faker.location.zipCode(),
		city: faker.location.city(),
		neighborhood: faker.location.street(),
		number: faker.location.buildingNumber(),
		street: faker.location.street()
	};
}