export type Requests = {
	_id: string,
	interventionDate: string;
	description: string;
	kilometers: number;
	price: number;
	comment: string,
	status: string,
	type: string,
	fileName: string,
	service: {
		_id: string,
		interventionDate: string;
		description: string;
		kilometers: number;
		price: number;
		status: string,
		vehicleId: string,
		fileName: string,
	}
	userId: string,
	createdAt:string,
};
