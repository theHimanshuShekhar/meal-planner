import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "~/lib/components/ui/button";
import type { User } from "~/lib/server/db";
import authClient from "~/lib/utils/auth-client";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { user } = Route.useRouteContext();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-4xl font-bold">Meal Planner</h1>
      <UserButton user={user} router={router} />
    </div>
  );
}

function UserButton({
  user,
  router,
}: {
  user: User;
  router: ReturnType<typeof useRouter>;
}) {
  return (
    <>
      {user ? (
        <div className="flex flex-col gap-2">
          <p>{user.name}</p>
          <div>
            User data:
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>

          <Button
            onClick={async () => {
              await authClient.signOut();
              router.invalidate();
            }}
            type="button"
            className="w-fit"
            variant="destructive"
            size="lg"
          >
            Sign out
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p>You are not signed in.</p>
          <Button
            onClick={() => {
              authClient.signIn.social({ provider: "google" });
            }}
            type="button"
            variant="outline"
            size="lg"
          >
            Sign in with Google
          </Button>
        </div>
      )}
    </>
  );
}
