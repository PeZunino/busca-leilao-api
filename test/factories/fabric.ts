import { Faker, fakerPT_BR as faker } from '@faker-js/faker';

export class Fabric{
	protected faker:Faker = faker;
	
	constructor(
	){}

	protected getBRStateAbbreviated(): string {
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

}