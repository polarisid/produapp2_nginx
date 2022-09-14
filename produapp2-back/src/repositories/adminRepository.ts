import { prisma } from "../database.js";
import {
  createItemType,
  Status,
  createHistoricType,
} from "../types/itensTypes.js";
import dayjs from "dayjs";
import { users } from "@prisma/client";
type UserRegisterType = Omit<users, "id">;
async function GetDayReport(ascCode: "SLZ5286953" | "AJU3198122") {
  const day = dayjs().format("YYYY-MM-DD");
  const dayin = day + " 00:00:00.000";
  const dayout = day + " 23:59:59.999";
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
        {
          userCreated: { ascCode: ascCode },
        },
        // {
        // 	updateTime: {
        // 		gte: new Date(dayin),
        // 		lt: new Date(dayout),
        // 	},
        // },
      ],
    },
    include: {
      userChanged: { select: { name: true, id: true } },
    },
  });
  return result;
}

async function GetHistoricReport(ascCode: "SLZ5286953" | "AJU3198122") {
  const day = dayjs().format("YYYY-MM-DD");
  const dayin = day + " 00:00:00.000";
  const dayout = day + " 23:59:59.999";
  const result = await prisma.historic.findMany({
    where: {
      AND: [
        { item: { userChanged: { ascCode: ascCode } } },
        {
          item: {
            updateTime: {
              gte: new Date(dayin),
              lt: new Date(dayout),
            },
          },
        },
      ],
    },
    select: {
      status: true,
      createdAt: true,
      item: {
        select: {
          os: true,
          model: true,
          status: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return result;
}
async function GetHistoricReportGroup(ascCode: "SLZ5286953" | "AJU3198122") {
  const day = dayjs().format("YYYY-MM-DD");
  const dayin = day + " 00:00:00.000";
  const dayout = day + " 23:59:59.999";

  const result = await prisma.historic.findMany({
    where: {
      AND: [
        { item: { userChanged: { ascCode: ascCode } } },
        {
          createdAt: {
            gte: new Date(dayin),
            lte: new Date(dayout),
          },
          // item: {
          // 	updateTime: {
          // 		gte: new Date(dayin),
          // 		lte: new Date(dayout),
          // 	},
          // },
        },
      ],
    },
    select: {
      status: true,
      createdAt: true,
      item: {
        select: {
          os: true,
          model: true,
          status: true,
          updateTime: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
}
async function GetUsersFromGroup(ascCode: "SLZ5286953" | "AJU3198122") {
  const result = await prisma.users.findMany({
    where: {
      AND: [{ ascCode: ascCode }, { role: "USER" }],
    },
    select: {
      id: true,
      name: true,
    },
  });
  return result;
}

async function Create(user: UserRegisterType) {
  const result = await prisma.users.create({
    data: user,
  });
  return result;
}

async function FindByEmail(email: string) {
  return prisma.users.findUnique({
    where: {
      email,
    },
  });
}
export default {
  Create,
  FindByEmail,
  GetDayReport,
  GetHistoricReportGroup,
  GetUsersFromGroup,
};
