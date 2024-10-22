import { PrismaClient } from '@prisma/client';
import { Response } from 'express';

export interface IUpload {
	url: string;
	fileName: string;
	id: number;
	prisma: PrismaClient;
	res: Response;
}
