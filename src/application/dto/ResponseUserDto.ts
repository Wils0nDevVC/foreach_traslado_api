// src/application/dtos/UserResponseDto.ts
export class UserResponseDto {
    constructor(
      public id: string,
      public name: string,
      public email: string,
      public token?: string
    ) {}
  }
  