import { fakerPT_BR as faker } from '@faker-js/faker';
import { Committee } from '@/domain/auctioneer/enterprise/entities/committee';

export function makeCommittee():Committee{
	return Committee.create({name: faker.company.name()});
}