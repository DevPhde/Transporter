import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { BadRequestException } from "src/Exceptions/BadRequestException";

@Injectable()
export class JsonWebTokenProvider {
    jwtVerifyAndDecode(hash: string): string | null {
        try {
            const decodedToken: any = jwt.verify(hash, 'joaozinho');
            if (decodedToken && decodedToken.email) {
                const email = decodedToken.email;
                return email;
            }
            return null;
        } catch (error) {
            throw new BadRequestException("Invalid JWT")
        }
    }
}