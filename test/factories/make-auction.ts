import { AuctionPropsInput } from '@/domain/auctioneer/enterprise/entities/auction';
import { GoodDTO, GoodType } from '@/domain/auctioneer/enterprise/entities/good';
import { AreaUnit } from '@/domain/auctioneer/enterprise/valueObjects/area';
import { UniqueID } from '@/domain/auctioneer/enterprise/valueObjects/uniqueId';
import { Fabric } from './fabric';

export class MakeAuction extends Fabric {
	public execute(): AuctionPropsInput {

		const auctioneerId = new UniqueID()
			.toString();

		const committeeId = new UniqueID()
			.toString();

		const type = this.faker.helpers.arrayElement(Object.values(GoodType));

		const good = this.makeGood(type);

		const item = {
			description: this.faker.lorem.sentence(),
			initialValue: this.faker.number.float({
				min: 2000,
				max: 40000,
				fractionDigits: 2
			}),
			origin: this.faker.lorem.word({ length: 5 }),
			startingBid: this.faker.number.float({
				min: 2000,
				max: 40000,
				fractionDigits: 2
			}),
			observation: this.faker.lorem.sentence(),
			type,
			good
		};

		return {
			publicationDate: this.faker.date.past(),
			openDates: [
				this.faker.date.future(),
			],
			items: [
				item
			],
			auctioneerId,
			committeeId
		};
	}

	private makeGood(type: GoodType): GoodDTO {
		const vehicle = {
			mount: this.faker.vehicle.model(),
			mileage: this.faker.number.int({
				min: 0,
				max: 300000 
			}),
			hasKeys: this.faker.datatype.boolean(),
			licensePlate: this.faker.vehicle.vrm(),
			color: this.faker.color.human(),
			brand: this.faker.vehicle.manufacturer(),
			model: this.faker.vehicle.model(),
			version: this.faker.string.alpha({ length: 3 }),
			year: this.faker.date.past({ years: 10 }),
			yearModel: this.faker.date.past({ years: 5 }),
			forCirculation: this.faker.datatype.boolean(),
			fuel: this.faker.helpers.arrayElement([
				'gasoline', 'ethanol', 'diesel', 'electric'
			]),
			type: this.faker.vehicle.type()
		};
    
		const realEstate = {
			isOccupied: this.faker.datatype.boolean(),
			totalArea: {
				value: this.faker.number.float({
					min: 100,
					max: 5000 
				}),
				unit: AreaUnit.SQUARE_METERS
			},
			builtArea: {
				value: this.faker.number.float({
					min: 0,
					max: 100 
				}),
				unit: AreaUnit.SQUARE_METERS
			},
			privateArea: {
				value: this.faker.number.float({
					min: 100,
					max: 5000 
				}),
				unit: AreaUnit.SQUARE_METERS
			},
			fieldArea: {
				value: this.faker.number.float({
					min: 100,
					max: 5000 
				}),
				unit: AreaUnit.SQUARE_METERS
			},
			debits: this.faker.number.float({
				min: 0,
				max: 20000 
			}),
			allowVisits: this.faker.datatype.boolean(),
			lawsuit: this.faker.datatype.boolean(),
			registration: this.faker.string.numeric({ length: 8 }),
			address: {
				street: this.faker.location.street(),
				city: this.faker.location.city(),
				state: this.getBRStateAbbreviated(),
				cep: this.faker.location.zipCode(),
				neighborhood: this.faker.location.city(),
				number: this.faker.location.buildingNumber()
			},
			complement: this.faker.location.secondaryAddress(),
			distanceToMetro: this.faker.number.int({
				min: 100,
				max: 5000 
			}),
		};
    
		switch (type) {
			case GoodType.CAR:
				return {
					data:{
						
						...vehicle,
						hasAirConditioning: this.faker.datatype.boolean(),
						steeringType: this.faker.vehicle.type(),
						hasSpareTire: this.faker.datatype.boolean(),
						gearbox: this.faker.helpers.arrayElement([
							'manual', 'automatic'
						]),
						hasArmor: this.faker.datatype.boolean(),
						numberOfDoors: this.faker.number.int({
							min: 2,
							max: 5 
						}),
					},
					type:GoodType.CAR
				};

			case GoodType.MOTORCYCLE:
				return {
					data:{...vehicle},
					type:GoodType.MOTORCYCLE
				};

			case GoodType.BUILT_PROPERTY:
				return {
					data:{
						...realEstate,
						hasGarage: this.faker.datatype.boolean(),
						numberOfBedrooms: this.faker.number.int({
							min: 1,
							max: 10 
						})
					},
					type: GoodType.BUILT_PROPERTY
				};

			case GoodType.UNBUILT_PROPERTY:
				return {
					data:{
						...realEstate,
						isUrban: this.faker.datatype.boolean(),
						hasWaterAccess: this.faker.datatype.boolean()
					},
					type:GoodType.UNBUILT_PROPERTY
				};
		}
	
	}

}
