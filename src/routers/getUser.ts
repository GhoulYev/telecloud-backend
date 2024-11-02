import { IGetUser } from '../types/getUser-type';

export const getUser = (param: IGetUser) => {
	param.prisma.user
		.findFirst({
			where: {
				id: param.id,
			},
			include: {
				files: false,
			},
		})
		.then((result) => {
			if (result) {
				param.res.status(200).json({ status: 'ok', user: result });
			} else {
				param.res
					.status(400)
					.json({ status: 'error', message: 'Error, user not found' });
			}
		});
};
