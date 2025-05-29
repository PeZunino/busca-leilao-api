import { randomUUID } from 'node:crypto';

export class UniqueID {
	private value: string;

	toString():string {
		return this.value;
	}

	toValue():string {
		return this.value;
	}

	constructor(value?: string) {
		this.value = value ?? randomUUID();
	}

	public equals(other: UniqueID):boolean {
		return other.toValue() === this.value;
	}
}