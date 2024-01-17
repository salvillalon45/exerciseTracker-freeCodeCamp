export async function getUsers(req: any, res: any, next: any) {
	console.log('Inside get Users');

	res.status(200).json({
		yes: 'success'
	});
}

export async function createNewUser(req: any, res: any, next: any) {}
