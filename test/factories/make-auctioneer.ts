import { Auctioneer } from '@/domain/auctioneer/enterprise/entities/auctioneer';
import { Address } from '@/domain/auctioneer/enterprise/valueObjects/address';
import { Fabric } from './fabric';


export class MakeAuctioneer extends Fabric{
	public execute(){
		const email = this.faker.internet.email();

		const name = this.faker.person.fullName();

		const phoneType = this.faker.helpers.arrayElement([
			'mobile', 'landline'
		]) as 'mobile' | 'landline';

		const phoneNumber = this.generateValidBRPhone(phoneType);


		const registrationCode = String(this.faker.number.int({ max: 5 }));

		const websites = [
			this.faker.internet.domainName()
		];

		const cep = this.faker.location.zipCode();

		const city = this.faker.location.city();

		const neighborhood = this.faker.location.street();

		const number = this.faker.location.buildingNumber();

		const street = this.faker.location.street();

		const state = this.getBRStateAbbreviated();

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

	private getBRStateAbbreviated(): string {
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

		const fullState = this.faker.location.state();

		const abbreviation = stateAbbreviationMap[fullState];

		return abbreviation;
	}

	private generateValidBRPhone(type: 'mobile' | 'landline'): string {
		const areaCode = this.faker.helpers.arrayElement([
			'11', '21', '31', '41', '51', '61', '71', '81', '91', '95'
		]); // DDDs reais, incluindo 95 (RR)

		if (type === 'mobile') {
			// celular: (XX) 9XXXX-XXXX
			const prefix = '9' + this.faker.number.int({
				min: 1000,
				max: 9999 
			})
				.toString()
				.padStart(4, '0');

			const suffix = this.faker.number.int({
				min: 1000,
				max: 9999 
			})
				.toString()
				.padStart(4, '0');

			return `(${areaCode}) ${prefix}-${suffix}`;
		} else {
			// fixo: (XX) [2|3|4]XXX-XXXX
			const prefixStart = this.faker.helpers.arrayElement([
				'2', '3', '4'
			]);

			const prefix = prefixStart + this.faker.number.int({
				min: 100,
				max: 999 
			})
				.toString()
				.padStart(3, '0');

			const suffix = this.faker.number.int({
				min: 1000,
				max: 9999 
			})
				.toString()
				.padStart(4, '0');

			return `(${areaCode}) ${prefix}-${suffix}`;
		}
	}

}