import { Request, Response } from "express";
import { createItemType } from "../types/itensTypes.js";
import itemsServices from "../services/itemsServices.js";

async function GetWorkSpace(req: Request, res: Response) {
	const { user } = res.locals;
	const items = await itemsServices.GetItemsByUserIdAndIsOpen(user.id);
	res.send(items);
}

async function InsertNewItem(req: Request, res: Response) {
	const { os, model } = res.locals;
	const item = {
		os,
		model,
		userId: res.locals.user.id,
		userIdUpdated: res.locals.user.id,
	} as createItemType;
	await itemsServices.InsertNewItemOnDB(item);

	res.sendStatus(201);
}

async function InsertNewItemBySupervisor(req: Request, res: Response) {
	const { os, model, userIdUpdated } = res.locals;
	const item = {
		os,
		model,
		userId: userIdUpdated,
		userIdUpdated: userIdUpdated,
	} as createItemType;
	await itemsServices.InsertNewItemOnDB(item);

	res.sendStatus(201);
}

async function UpdateStatus(req: Request, res: Response) {
	const { id } = req.params;
	const { user } = res.locals;
	const { status } = res.locals;
	console.log(user);
	console.log(status);
	console.log(id);
	await itemsServices.UpdateStatus(Number(id), status, user.id);
	res.sendStatus(204);
}

async function UpdateElapsedTime(req: Request, res: Response) {
	const { id, elapsedTime } = req.params;
	const { user } = res.locals;
	await itemsServices.UpdateElapsedTime(
		Number(id),
		Number(elapsedTime),
		user.id
	);
	res.sendStatus(204);
}

async function SearchByOs(req: Request, res: Response) {
	const { os } = req.params;
	const { user } = res.locals;
	console.log(user);
	const items = await itemsServices.GetItemsByOs(os, user.id);
	res.send(items);
}
async function GetAllFinished(req: Request, res: Response) {
	const { user } = res.locals;
	const items = await itemsServices.GetAllFinished();
	res.send(items);
}
async function getOverviewDay(req: Request, res: Response) {
	const result = await itemsServices.getOverviewDay();
	res.json(result);
}
export default {
	GetWorkSpace,
	InsertNewItem,
	UpdateStatus,
	UpdateElapsedTime,
	SearchByOs,
	GetAllFinished,
	getOverviewDay,
	InsertNewItemBySupervisor,
};
