import { auth, signOut } from "@/src/lib/auth";
import { AUTH_ROUTES } from "@/src/lib/routes";
import type { UserType } from "@/src/types/user";
import Profile from "@/src/components/profilePage/Profile";

async function ProfilePage() {
  const session = await auth();

  return (
    <>
      {/* <form
        action={async () => {
          "use server";
          await signOut({
            redirectTo: AUTH_ROUTES[0],
            redirect: true,
          });
        }}
      >
        <button type="submit">SignOut</button>
      </form> */}
      <Profile user={session?.user as UserType} />
    </>
  );
}

export default ProfilePage;
