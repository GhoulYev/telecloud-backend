import { PrismaClient } from '@prisma/client';
import { Response } from 'express';

export interface ISetPath {
	id: number;
	path: string;
	res: Response;
	prisma: PrismaClient;
}
