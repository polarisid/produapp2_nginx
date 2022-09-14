import joi from "joi";
import { createItemType } from "../types/itensTypes.js";

type receiveItemType = Omit<createItemType, "userId">;

const createItemSchema = joi.object<receiveItemType>({
	os: joi.string().required(),
	model: joi.string().required(),
});

const createItemBySupervisorSchema = joi.object<receiveItemType>({
	os: joi.string().required(),
	model: joi.string().required(),
	userIdUpdated: joi.string().required(),
});
const updateStatusSchema = joi.object({
	status: joi
		.string()
		.valid(
			"Finished",
			"OQCFail",
			"OQCPass",
			"Pending",
			"Avaliation",
			"ConfirmedCost",
			"ConfirmedSaw",
			"ConfirmedParts",
			"TechnicalAdvice"
		)
		.required(),
});

export default {
	createItemSchema,
	updateStatusSchema,
	createItemBySupervisorSchema,
};
