import { Entity } from '@/core/shared/entity';
import { UniqueID } from '../valueObjects/uniqueId';

interface Props{
	name:string
	createdAt:Date;
	updatedAt?:Date | null;
}

export class Committee extends Entity<Props>{
	public static create(props:Props, id?:UniqueID){
		return new Committee(props,id);
	}
  
	get name():string{
		return this.props.name;
	}

	set name(name: string) {
		this.props.name = name;
	}
	
	get createdAt(){
		return this.props.createdAt;
	}

	get updatedAt(){
		return this.props.updatedAt;
	}
}