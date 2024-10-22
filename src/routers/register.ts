import { IRegister } from '../types/router-type';

export const register = (param: IRegister) => {
	param.prisma.user
		.findFirst({
			where: {
				id: param.id,
			},
		})
		.then((result) => {
			if (!result) {
				param.prisma.user
					.create({
						data: {
							id: param.id,
						},
					})
					.then((obj) =>
						param.res.status(200).json({ status: 'ok', user: obj })
					);
			} else {
				param.res
					.status(400)
					.json({ status: 'error', message: 'User is find' });
			}
		});
};
