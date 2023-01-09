import { Hono } from "hono";

const app = new Hono();

app.get("/api/teams/all", async (ctx) => {
  const { results } = await ctx.env.DB.prepare(
    "SELECT * FROM tweets INNER JOIN users ON tweets.author_id = users.author_id;"
  ).all();
  return Response.json(results);
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text(err.toString());
});

app.notFound((c) => c.text("Not found", 404));

export default app;
