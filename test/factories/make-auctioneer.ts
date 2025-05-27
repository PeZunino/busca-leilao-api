import { fakerPT_BR as faker } from '@faker-js/faker';
import { Auctioneer } from '@/domain/auctioneer/enterprise/entities/auctioneer';
import { Address } from '@/domain/auctioneer/enterprise/valueObjects/address';

const stateAbbreviationMap: Record<string, string> = {
	'Acre': 'AC',
	'Alagoas': 'AL',
	'Amapá': 'AP',
	'Amazonas': 'AM',
	'Bahia': 'BA',
	'Ceará': 'CE',
	'Distrito Federal': 'DF',
	'Espírito Santo': 'ES',
	'Goiás': 'GO',
	'Maranhão': 'MA',
	'Mato Grosso': 'MT',
	'Mato Grosso do Sul': 'MS',
	'Minas Gerais': 'MG',
	'Pará': 'PA',
	'Paraíba': 'PB',
	'Paraná': 'PR',
	'Pernambuco': 'PE',
	'Piauí': 'PI',
	'Rio de Janeiro': 'RJ',
	'Rio Grande do Norte': 'RN',
	'Rio Grande do Sul': 'RS',
	'Rondônia': 'RO',
	'Roraima': 'RR',
	'Santa Catarina': 'SC',
	'São Paulo': 'SP',
	'Sergipe': 'SE',
	'Tocantins': 'TO',
};

function getBRStateAbbreviated(): string {
	const fullState = faker.location.state();

	const abbreviation = stateAbbreviationMap[fullState];

	return abbreviation;
}


function generateValidBRPhone(type: 'mobile' | 'landline'): string {
	const areaCode = faker.helpers.arrayElement([
		'11', '21', '31', '41', '51', '61', '71', '81', '91', '95'
	]); // DDDs reais, incluindo 95 (RR)

	if (type === 'mobile') {
		// celular: (XX) 9XXXX-XXXX
		const prefix = '9' + faker.number.int({
			min: 1000,
			max: 9999 
		})
			.toString()
			.padStart(4, '0');

		const suffix = faker.number.int({
			min: 1000,
			max: 9999 
		})
			.toString()
			.padStart(4, '0');

		return `(${areaCode}) ${prefix}-${suffix}`;
	} else {
		// fixo: (XX) [2|3|4]XXX-XXXX
		const prefixStart = faker.helpers.arrayElement([
			'2', '3', '4'
		]);

		const prefix = prefixStart + faker.number.int({
			min: 100,
			max: 999 
		})
			.toString()
			.padStart(3, '0');

		const suffix = faker.number.int({
			min: 1000,
			max: 9999 
		})
			.toString()
			.padStart(4, '0');

		return `(${areaCode}) ${prefix}-${suffix}`;
	}
}


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