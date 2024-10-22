import { IDownload } from '../types/download-type';

export const download = (param: IDownload) => {
	param.prisma.file
		.findUnique({
			where: {
				id: param.fileId,
			},
		})
		.then((result) => {
			if (result) {
				param.res.status(200).download(result.filePath, result.fileName);
			} else {
				param.res
					.status(400)
					.json({ status: 'error', message: 'Error: file not found' });
			}
		});
};
