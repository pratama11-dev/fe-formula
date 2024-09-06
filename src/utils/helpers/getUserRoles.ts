import { Sessions } from "types/Session";

export default function getUserRole(session: Sessions | undefined): string {
  console.log("asd2", session?.data);
  
  const role = session?.data?.data?.sso_user_roles_platform_pivot?.find(
    (d: any) => d.sso_platforms?.client_id === process.env.NEXT_PUBLIC_CLIENT_ID
  )?.sso_roles?.roles_name ?? "No Roles";

  return role;
}
