import { Prisma } from '@prisma/client';
import { Committee } from '@/domain/auctioneer/enterprise/entities/committee';

export class PrismaCommitteeMapper{
	static toPrisma(committee:Committee):Prisma.CommitteeCreateInput{
		return{name: committee.name};
	}
}