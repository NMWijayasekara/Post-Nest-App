import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class Editior implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role == "EDITOR") {
        return true
    }

    return false;
  }
}
