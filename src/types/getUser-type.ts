import { PrismaClient } from '@prisma/client';
import { Response } from 'express';

export interface IGetUser {
	id: number;
	res: Response;
	prisma: PrismaClient;
}
