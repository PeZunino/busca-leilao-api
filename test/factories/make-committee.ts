import { fakerPT_BR as faker } from '@faker-js/faker';
import { Committee } from '@/modules/auctions/domain/entities/committee';

export function makeCommittee():Committee{
	return Committee.create({name: faker.company.name()});
}