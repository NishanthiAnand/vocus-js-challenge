import express from 'express';
// @ts-ignore squash JSON compiler warning
import permissions from '../../mocks/permissions.json';
import roles from '../../mocks/roles.json';

export const permissionsRoute: express.Handler = (_req: any, res) => {
  const id : number = parseInt(_req.params.id);
  const userRole: any = roles.filter(role => role.userId === id);
  const roleName: string = userRole[0].role;
  res.status(200).json({
      "role": roleName,
      "permission": getPermissions(roleName)
  });
};

function getPermissions(role: string): any {
  let permission: any;
  switch(role) {
      case "ADMIN" : permission = permissions.ADMIN; break;
      case "OWNER" : permission = permissions.OWNER; break;
      case "USER" : permission = permissions.USER; break;
      default: permission = permissions.GUEST
  }

  return permission;
}
