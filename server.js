import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.post('/usuarios', async (req, res) => {
	await prisma.user.create({
		data: {
			email: req.body.email,
			name: req.body.name,
			age: req.body.age,
		},
	});
	res.status(201).json(req.body);
});

app.get('/usuarios', async (req, res) => {
	let users;

	// Query params
	if (req.params) {
		users = await prisma.user.findMany({
			where: { name: req.query.name },
		});
	} else {
		users = await prisma.user.findMany();
	}

	res.status(200).json(users);
});

//Route params

app.put('/usuarios/:id', async (req, res) => {
	await prisma.user.update({
		where: { id: req.params.id },
		data: {
			email: req.body.email,
			name: req.body.name,
			age: req.body.age,
		},
	});
	res.status(201).json({
		message: 'Usuário atualizado',
		body: req.body,
	});
});

app.delete('/usuarios/:id', async (req, res) => {
	await prisma.user.delete({
		where: { id: req.params.id },
	});
	res.status(201).json({
		message: 'Usuário deletado',
		body: req.body,
	});
});

app.listen(3000);
