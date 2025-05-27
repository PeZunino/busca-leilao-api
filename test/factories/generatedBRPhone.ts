import { fakerPT_BR as faker } from '@faker-js/faker';

export function generateValidBRPhone(type: 'mobile' | 'landline'): string {
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
