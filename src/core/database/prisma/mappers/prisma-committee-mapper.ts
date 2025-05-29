import { Prisma } from '@prisma/client';
import { Committee } from '@/modules/auctions/domain/entities/committee';

export class PrismaCommitteeMapper{
	static toPrisma(committee:Committee):Prisma.CommitteeCreateInput{
		return{name: committee.name};
	}
}