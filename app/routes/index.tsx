import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "~/lib/components/ui/button";
import authClient from "~/lib/utils/auth-client";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { user } = Route.useRouteContext();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-4xl font-bold">TanStarter</h1>
      <div className="flex items-center gap-2">
        This is an unprotected page:
        <pre className="rounded-md border bg-card p-1 text-card-foreground">
          routes/index.tsx
        </pre>
      </div>

      {user ? (
        <div className="flex flex-col gap-2">
          <p>Welcome back, {user.name}!</p>
          <div>
            More data:
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

      <a
        className="text-muted-foreground underline hover:text-foreground"
        href="https://github.com/dotnize/tanstarter"
        target="_blank"
        rel="noreferrer noopener"
      >
        dotnize/tanstarter
      </a>
    </div>
  );
}
