import type { Route } from "./+types/chrome-devtools-well-known";

export async function loader({}: Route.LoaderArgs) {
  return new Response(null, { status: 204 });
}

export default function ChromeDevtoolsWellKnown() {
  return null;
}
