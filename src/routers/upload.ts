import axios from 'axios';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { IUpload } from '../types/IUpload';

export const upload = (param: IUpload) => {
	const extend = `${uuidv4()}.${param.fileName.split('.').pop()}`;
	const path = `${process.env.BASE_PATH}/${extend}`;
	axios({ url: param.url, responseType: 'stream' })
		.then((response) => {
			return new Promise(() => {
				response.data
					.pipe(fs.createWriteStream(`${path}`))
					.on('finish', () => {
						param.prisma.user
							.findUnique({
								where: { id: param.id },
							})
							.then((result) => {
								if (result) {
									param.prisma.file
										.create({
											data: {
												ownerId: param.id,
												fileName: param.fileName,
												filePath: path,
											},
										})
										.then((result) => {
											param.res
												.status(200)
												.json({ status: 'ok', object: result });
										});
								} else {
									param.res.status(400).json({
										status: 'error',
										message: 'Error: User not found',
									});
								}
							});
					})
					.on('error', () => {
						param.res.status(400).json({
							status: 'error',
							message: 'Error. Failed to upload file',
						});
					});
			});
		})
		.catch(() => {
			param.res
				.status(400)
				.json({ status: 'error', message: 'Error. Failed to upload file' });
		});
};
