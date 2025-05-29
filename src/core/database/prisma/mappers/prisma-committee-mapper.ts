import { Committee as PrismaCommittee,Prisma} from '@prisma/client';
import { Committee } from '@/modules/auctions/domain/entities/committee';

export class PrismaCommitteeMapper{
	static toDomain(raw:PrismaCommittee):Committee{
		return Committee.create({name:raw.name});
	}
	static toPrisma(committee:Committee):Prisma.CommitteeCreateInput{
		return{name: committee.name};
	}
}