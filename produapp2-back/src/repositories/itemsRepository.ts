import { prisma } from "../database.js";
import {
	createItemType,
	Status,
	createHistoricType,
} from "../types/itensTypes.js";
import userRepository from "./userRepository.js";
import dayjs from "dayjs";

async function Insert(item: createItemType) {
	const result = await prisma.item.create({
		data: item,
	});
	return result;
}

async function GetAscByOs(os: string) {
	const result = await prisma.item.findUnique({
		where: { os },
		select: {
			userCreated: { select: { ascCode: true } },
		},
	});
	if (result) {
		return result.userCreated.ascCode;
	}
	return result;
}
async function GetAscById(id: number) {
	const result = await prisma.item.findUnique({
		where: { id },
		select: {
			userCreated: { select: { ascCode: true } },
		},
	});
	if (result) {
		return result.userCreated.ascCode;
	}
	return result;
}

async function FindItembyOs(os: string) {
	const result = await prisma.item.findMany({
		where: {
			os,
		},
		include: {
			userChanged: { select: { name: true, id: true } },
			userCreated: { select: { name: true, id: true } },
		},
	});
	return result;
}
async function UpdateHistoric(historic: createHistoricType) {
	const result = await prisma.historic.create({
		data: historic,
	});
	return result;
}
async function FindById(id: number) {
	const result = await prisma.item.findUnique({
		where: { id },
	});
	return result;
}

async function GetItemsByUserIdAndIsOpen(userId: number) {
	const result = await prisma.item.findMany({
		where: {
			AND: [
				{
					OR: [
						{ status: "Avaliation" },
						{ status: "OQCFail" },
						{ status: "ConfirmedCost" },
						{ status: "ConfirmedSaw" },
						{ status: "ConfirmedParts" },
						{ status: "TechnicalAdvice" },
					],
				},
				{ userIdUpdated: userId },
			],
		},
		include: {
			userChanged: { select: { name: true, id: true } },
			userCreated: { select: { name: true, id: true } },
		},
	});
	return result;
}

async function UpdateStatus(id: number, status: Status, userId: number) {
	if (status == "OQCFail") {
		const result = await prisma.item.update({
			where: { id },
			data: {
				status: { set: status },
				ffOqc: { set: true },
			},
		});
		return result;
	}
	const result = await prisma.item.update({
		where: { id },
		data: {
			status: { set: status },
			updateTime: { set: new Date() },
			userIdUpdated: { set: userId },
		},
	});

	return result;
}

async function UpdateElapsedTime(id: number, elapsedTime: number) {
	const result = await prisma.item.update({
		where: { id },
		data: { elapsedTime: { set: elapsedTime } },
	});
	return result;
}

async function FindByOs(os: string) {
	const result = await prisma.item.findMany({
		where: { os },
	});
	return result;
}

async function getAllFinished() {
	const result = await prisma.item.findMany({
		where: {
			AND: [
				{ status: "Finished" },
				{
					userCreated: {
						ascCode: "AJU3198122",
					},
				},
			],
		},
		include: {
			userChanged: { select: { name: true, id: true } },
			userCreated: { select: { name: true, id: true } },
		},
	});
	return result;
}
export default {
	GetAscById,
	GetAscByOs,
	UpdateHistoric,
	Insert,
	FindByOs,
	GetItemsByUserIdAndIsOpen,
	UpdateStatus,
	UpdateElapsedTime,
	FindById,
	FindItembyOs,
	getAllFinished,
	getRankByAvaliations,
};

async function getRankByAvaliations() {
	const day = dayjs().format("YYYY-MM-DD");
	const dayin = day + " 00:00:00.000";
	const dayout = day + " 23:59:59.999";

	const result = await prisma.item.findMany({
		// by: ["userId"],
		// where: {
		// 	createTime: {
		// 		gte: new Date(dayin),
		// 		lte: new Date(dayout),
		// 	},
		// },
		include: {
			userCreated: { select: { name: true } },
		},
	});
	return result;
}
