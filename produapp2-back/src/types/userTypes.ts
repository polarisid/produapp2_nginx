import { users } from "@prisma/client";

type UserRegisterType = Omit<users, "id" | "role">;
type UserLoginType = Omit<users, "id" | "name" | "ascCode" | "role">;
export { UserRegisterType, UserLoginType };
