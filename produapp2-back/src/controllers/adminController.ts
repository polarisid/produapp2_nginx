import { Request, Response } from "express";
import adminServices from "../services/adminServices.js";
import { users } from "@prisma/client";

type UserRegisterType = Omit<users, "id">;
enum Asc {
  "AJU3198122" = "AJU3198122",
  "SLZ5286953" = "SLZ5286953",
}
async function GetDasboard(req: Request, res: Response) {
  const { asc } = req.params;
  const { user } = res.locals;
  if (user.role !== "ADMIN") {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  if (asc === Asc.AJU3198122) {
    const result = await adminServices.GetDashByAsc(asc);
    res.json(result);
  } else if (asc === Asc.SLZ5286953) {
    const result = await adminServices.GetDashByAsc(asc);
    res.json(result);
  } else {
    return res.status(400).json({
      message: "Invalid asc code",
    });
  }
}

async function GetReport(req: Request, res: Response) {
  const { asc } = req.params;
  const { user } = res.locals;
  if (user.role !== "ADMIN") {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  if (asc === Asc.AJU3198122) {
    const result = await adminServices.GetHistoricByAsc(asc);
    res.json(result);
  } else if (asc === Asc.SLZ5286953) {
    const result = await adminServices.GetHistoricByAsc(asc);
    res.json(result);
  } else {
    return res.status(400).json({
      message: "Invalid asc code",
    });
  }
}

async function GetUsersFromGroup(req: Request, res: Response) {
  const { asc } = req.params;
  const Asc = <Asc>asc.toString();
  const result = await adminServices.GetUsersFromAsc(Asc);

  console.log(result);
  return res.send(result);
}

async function CreateAdminUser(req: Request, res: Response) {
  const body = req.body as UserRegisterType;
  await adminServices.CreateUserAdmin(body);
  res.status(201).send("User created");
}
export default { GetDasboard, GetReport, GetUsersFromGroup, CreateAdminUser };
