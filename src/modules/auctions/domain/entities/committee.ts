import { Entity } from '@/core/shared/entity';
import { UniqueID } from '../valueObjects/uniqueId';

interface Props{
	name:string
}

export class Committee extends Entity<Props>{
	public static create(props:Props, id?:UniqueID){
		return new Committee({name:props.name},id);
	}
  
	get name():string{
		return this.props.name;
	}

	public setName(newName: string): void {
		this.props.name = newName;
	}
}