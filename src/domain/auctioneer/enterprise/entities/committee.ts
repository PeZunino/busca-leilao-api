import { Entity } from '@/core/shared/entity';

interface Props{
	name:string
}

export class Committee extends Entity<Props>{
	public static create(props:Props){
		return new Committee({name:props.name});
	}
  
	get name():string{
		return this.props.name;
	}

	public setName(newName: string): void {
		this.props.name = newName;
	}
}