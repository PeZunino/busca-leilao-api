import { URL } from 'node:url';
import z from 'zod';

export class Website{
	private static readonly schema = z.string()
		.url('Invalid URL format');

	private constructor(private readonly urlValue:URL){}

	public static create(urlInput:string):Website{

		const urlWithProtocol = urlInput.startsWith('http://') || urlInput.startsWith('https://') 
			? urlInput 
			: `https://${urlInput}`;

		try {
			const validURLString = Website.schema.parse(urlWithProtocol);

			return new Website(new URL(validURLString));
      
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				throw new Error(`Website creation failed: ${error.errors.map(e => e.message)
					.join(', ')}`);
			}

			throw new Error(`Website creation failed: ${error.message || 'Unknown error'}`); 
		}
	}

	public equals(other: Website): boolean {
		if (!(other instanceof Website)) {
			return false;
		}

		return this.urlValue.toString() === other.urlValue.toString();
	}

	get url(): URL {
		return this.urlValue;
	}

}