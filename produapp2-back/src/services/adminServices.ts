import adminRepository from "../repositories/adminRepository.js";
import { users } from "@prisma/client";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";
import bcrypt from "bcrypt";

type UserRegisterType = Omit<users, "id">;

async function GetDashByAsc(asc: "SLZ5286953" | "AJU3198122") {
  const date = new Date();
  const result = await adminRepository.GetDayReport(asc);
  return result;
}
async function GetHistoricByAsc(asc: "SLZ5286953" | "AJU3198122") {
  const date = new Date();
  const result = await adminRepository.GetHistoricReportGroup(asc);
  return result;
}
async function GetUsersFromAsc(asc: "SLZ5286953" | "AJU3198122") {
  const result = await adminRepository.GetUsersFromGroup(asc);
  return result;
}
async function CreateUserAdmin(user: UserRegisterType) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const userExists = await adminRepository.FindByEmail(user.email);
  if (userExists) throw conflictError("Email already exists in database");
  console.log(userExists);
  const data = await adminRepository.Create({
    ...user,
    password: hashedPassword,
  });
  return data;
}

export default {
  GetDashByAsc,
  GetHistoricByAsc,
  GetUsersFromAsc,
  CreateUserAdmin,
};
