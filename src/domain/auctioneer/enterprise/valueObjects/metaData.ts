
import { z } from 'zod';


const metadataSchema = z.record(z.string(), z.string()); 

export class Metadata {
	
	private constructor(private readonly value: Record<string, string>) {} 

	public static create(data: Record<string, any>): Metadata { 
		try {
			
			const validatedData = metadataSchema.parse(data);

			const deepCopiedData = JSON.parse(JSON.stringify(validatedData)); 

			return new Metadata(deepCopiedData);
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				throw new Error(`Metadata creation failed: ${error.errors.map(e => e.message)
					.join(', ')}`);
			}

			throw new Error(`Metadata creation failed: ${error.message || 'Unknown error'}`);
		}
	}

	public equals(other: Metadata): boolean {
		if (!(other instanceof Metadata)) {
			return false;
		}

		return JSON.stringify(this.value) === JSON.stringify(other.value);
	}

	public getValue(): Readonly<Record<string, string>> { 
		return JSON.parse(JSON.stringify(this.value));
	}

	public get<T>(key: string): T | undefined {
		return this.value[key] as T; 
	}

	public has(key: string): boolean {
		return Object.prototype.hasOwnProperty.call(this.value, key);
	}

	toString(): string {
		return JSON.stringify(this.value);
	}
}