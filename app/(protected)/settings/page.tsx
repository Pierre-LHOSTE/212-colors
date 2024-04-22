import { auth, signOut } from "@/src/lib/auth";
import { AUTH_ROUTES } from "@/src/lib/routes";

async function SettingsPage() {
  const session = await auth();
  console.log("🚀 ~ session:", session);
  return (
    <>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut({
            redirectTo: AUTH_ROUTES[0],
            redirect: true,
          });
        }}
      >
        <button type="submit">SignOut</button>
      </form>
    </>
  );
}

export default SettingsPage;
