import { Committee } from '../../enterprise/entities/committee';

export abstract class CommitteeRepository{
	abstract create(committee:Committee):Promise<void>
}