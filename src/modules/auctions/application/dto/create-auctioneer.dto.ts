export interface CreateAuctioneerUseCaseRequest{
	name:string
	registrationCode:string 
	phoneNumber:string 
	email:string
	street:string 
	number:string 
	cep:string
	neighborhood:string 
	city:string
	state:string
	websites:string[]
}