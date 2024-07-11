import Profile from "@/src/components/profilePage/Profile";
import { auth } from "@/src/lib/auth";
import type { UserType } from "@/src/types/user";

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
