import { Committee } from '../../domain/entities/committee';

export abstract class CommitteeRepository{
	abstract create(committee:Committee):Promise<void>
}