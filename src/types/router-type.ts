import { PrismaClient } from '@prisma/client';
import { Response } from 'express';

export interface IRegister {
	id: number;
	res: Response;
	prisma: PrismaClient;
}
