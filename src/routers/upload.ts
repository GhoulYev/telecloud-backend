import axios from 'axios';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { IUpload } from '../types/IUpload';
import { response } from 'express';

export const upload = (param: IUpload) => {
	param.prisma.user
		.findUnique({
			where: {
				id: param.id,
			},
		})
		.then((find) => {
			if (find) {
				const extend = `${uuidv4()}.${param.fileName.split('.').pop()}`;
				const path = `${process.env.BASE_PATH}/${extend}`;
				axios({ url: param.url, responseType: 'stream' })
					.then((response) => {
						return new Promise(() => {
							response.data
								.pipe(fs.createWriteStream(`${path}`))
								.on('finish', () => {
									param.prisma.file
										.create({
											data: {
												ownerId: param.id,
												fileName: param.fileName,
												filePath: path,
											},
										})
										.then((result) => {
											result.id = Number(result.id);
											param.res
												.status(200)
												.json({ status: 'ok', object: result });
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
						param.res.status(400).json({
							status: 'error',
							message: 'Error. Failed to upload file',
						});
					});
			} else {
				param.res
					.status(400)
					.json({ status: 'error', message: 'Error: user not found' });
			}
		});
};
