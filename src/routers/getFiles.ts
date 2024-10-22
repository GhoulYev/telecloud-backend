import { IGetFiles } from '../types/getFiles-type';

export const getFiles = (param: IGetFiles) => {
	param.prisma.user
		.findFirst({
			where: {
				OR: [
					{
						id: param.id,
					},
					{
						path: param.path,
					},
				],
			},
			include: {
				files: true,
			},
		})
		.then((result) => {
			if (result) {
				param.res.status(200).json({ status: 'ok', files: result.files });
			} else {
				param.res
					.status(400)
					.json({ status: 'error', message: 'Error, user not found' });
			}
		});
};
