import { Hono } from "hono";

const app = new Hono();

app.get("/api/search", async (ctx) => {
  const { results } = await ctx.env.DB.prepare(
    "SELECT * FROM tweet_info"
  ).all();
  return Response.json(results);
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text(err.toString());
});

app.notFound((c) => c.text("Not found", 404));

export default app;
