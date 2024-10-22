import { ISetPath } from '../types/setPath-type';

export const setPath = (param: ISetPath) => {
	param.prisma.user
		.upsert({
			where: {
				id: param.id,
			},
			update: {
				path: param.path,
			},
			create: {
				id: param.id,
				path: param.path,
			},
		})
		.then((obj) => param.res.status(200).json({ status: 'ok', user: obj }))
		.catch((error) =>
			param.res.status(400).json({ status: 'error', error: error })
		);
};
