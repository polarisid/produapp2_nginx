import joi from "joi";
import { UserRegisterType, UserLoginType } from "../types/userTypes.js";
import { users } from "@prisma/client";

type adminRegisterType = Omit<users, "id">;
const userRegisterSchema = joi.object<UserRegisterType>({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  ascCode: joi.string().valid("SLZ5286953", "AJU3198122").required(),
});

const adminRegisterSchema = joi.object<adminRegisterType>({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  ascCode: joi.string().valid("SLZ5286953", "AJU3198122").required(),
  role: joi.string().valid("ADMIN").required(),
});

const userLoginSchema = joi.object<UserLoginType>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export default { userRegisterSchema, userLoginSchema, adminRegisterSchema };
