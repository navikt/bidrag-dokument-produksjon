import type { MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno

export const meta: MetaFunction = () => {
  return [
    { title: "bidrag-dokumentmal" },
    { name: "description", content: "bidrag-dokumentmal" },
  ];
};
export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Velkommen til bidrag-dokumentmal</h1>
    </div>
  );
}
