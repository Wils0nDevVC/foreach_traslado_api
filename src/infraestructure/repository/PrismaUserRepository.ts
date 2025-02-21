// src/application/use-cases/RegisterUser.ts
import { UserEntity } from '../../domain';
import { IUserRepository } from '../../domain/repository/IUserRepository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {

  constructor() {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({ where : {email} });
    return user ? UserEntity.fromObject(user) : null;
  }
  async save(user: UserEntity): Promise<UserEntity> {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      }
    });
    return UserEntity.fromObject(newUser);
  }

}
