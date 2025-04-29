import { UniqueEntityID } from './unique-entity-id';

export abstract class Entity<Props> {
	private _id: UniqueEntityID;
	protected props: Props;

	get id() {
		return this._id;
	}

	// protected constructor(props: Props, id?: UniqueEntityID) {
	protected constructor(props: Props) {
		
		this.props = props;

		this._id = new UniqueEntityID();
	}

	public equals(entity: Entity<any>) {
		if (entity === this) {
			return true;
		}

		if (entity.id === this._id) {
			return true;
		}

		return false;
	}
}