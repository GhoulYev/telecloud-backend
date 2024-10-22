import { PrismaClient } from '@prisma/client';
import { Response } from 'express';

export interface IDownload {
	fileId: number;
	res: Response;
	prisma: PrismaClient;
}
