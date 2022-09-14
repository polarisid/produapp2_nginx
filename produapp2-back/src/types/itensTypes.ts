import { item, historic } from "@prisma/client";

type createItemType = Omit<
	item,
	"id" | "status" | "updateTime" | "elapsedTime" | "ffOqc" | "createTime"
>;

type createHistoricType = Omit<historic, "id" | "createdAt">;

enum Status {
	Finished = "Finished",
	OQCFail = "OQCFail",
	OQCPass = "OQCPass",
	Pending = "Pending",
	Avaliation = "Avaliation",
	ConfirmedCost = "ConfirmedCost",
	ConfirmedSaw = "ConfirmedSaw",
	ConfirmedParts = "ConfirmedParts",
	TechnicalAdvice = "TechnicalAdvice",
}

export { createItemType, Status, createHistoricType };
