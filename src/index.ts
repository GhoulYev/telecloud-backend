import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { body, oneOf, param, validationResult } from 'express-validator';
import { register } from './routers/register';
import { setPath } from './routers/setPath';
import { getFiles } from './routers/getFiles';
import { upload } from './routers/upload';
import { download } from './routers/download';
import { getUser } from './routers/getUser';

dotenv.config();

(BigInt.prototype as any).toJSON = function () {
	return this.toString();
};
const prisma = new PrismaClient();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT ?? 3000;

const main = async () => {
	const apiRouters = express.Router();

	apiRouters.post(
		'/register',
		body('id').notEmpty().escape().isNumeric().toInt(),
		(req, res) => {
			const errors = validationResult(req);
			if (errors.isEmpty()) {
				register({
					id: req.body.id,
					res,
					prisma,
				});
			} else {
				res.status(400).json({
					errors: errors.array(),
				});
			}
		}
	);

	apiRouters.post(
		'/setpath',
		body('path').trim().notEmpty().escape().isLowercase().isAlpha('en-US'),
		body('id').notEmpty().escape().isNumeric().toInt(),
		(req, res) => {
			const errors = validationResult(req);
			if (errors.isEmpty()) {
				setPath({
					id: req.body.id,
					path: req.body.path,
					res,
					prisma,
				});
			} else {
				res.status(400).json({ status: 'error', error: errors.array() });
			}
		}
	);

	apiRouters.post(
		'/getfiles',
		oneOf([
			body('path').trim().notEmpty().escape().isLowercase().isAlpha('en-US'),
			body('id').notEmpty().escape().isNumeric().toInt(),
		]),
		(req, res) => {
			const errors = validationResult(req);
			if (errors.isEmpty()) {
				getFiles({
					id: req.body.id,
					path: req.body.path,
					prisma,
					res,
				});
			} else {
				res.status(400).json({ status: 'error', error: errors });
			}
		}
	);

	apiRouters.post(
		'/upload',
		body('id').notEmpty().escape().isNumeric().toInt(),
		body('fileName').trim().notEmpty().isString(),
		body('url').trim().notEmpty().isURL(),
		(req, res) => {
			const errors = validationResult(req);
			if (errors.isEmpty()) {
				upload({
					id: req.body.id,
					url: req.body.url,
					fileName: req.body.fileName,
					prisma,
					res,
				});
			} else {
				res.status(400).json({ status: 'error', error: errors });
			}
		}
	);

	apiRouters.get(
		'/download/:fileId/',
		param('fileId').notEmpty().escape().isNumeric().toInt(),
		(req, res) => {
			const errors = validationResult(req);
			if (errors.isEmpty()) {
				download({
					fileId: req.params!.fileId,
					prisma,
					res,
				});
			} else {
				res.status(400).json({
					status: 'error',
					error: errors,
				});
			}
		}
	);

	apiRouters.post(
		'/getuser',
		body('id').notEmpty().escape().isNumeric().toInt(),
		(req, res) => {
			const errors = validationResult(req);
			if (errors.isEmpty()) {
				getUser({
					id: req.body.id,
					prisma,
					res,
				});
			} else {
				res.status(400).json({
					status: 'error',
					error: errors,
				});
			}
		}
	);

	app.use('/vlad', apiRouters);

	app.listen(PORT, () =>
		console.log(`WebServer has been started on ${PORT} port`)
	);
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
