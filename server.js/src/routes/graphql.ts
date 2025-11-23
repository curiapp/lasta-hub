import { db } from "@/db";
import { programmes } from "@/db/schema";
import cors from "cors";
import { eq } from "drizzle-orm";
import { Express } from "express";
import { buildSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";

const schema = buildSchema(`
	type Programme {
		id: ID
		code: String
		title: String
		level: Int
		faculty: ID
		department: ID
		initiator: ID
	}

	type Query { 
		hello: String
		programmes(id: String): [Programme]
	} 
`);

const root = {
	hello() {
		return "Hello world!";
	},
	programmes({ id }) {
		if (id) {
			return db.select().from(programmes).where(eq(programmes.id, id));
		} else {
			return db.select().from(programmes);
		}
	}
};

//all programmes

//all phases of a programme

//all steps in a phase of a programme

//programmes a user is involved in

export default (app: Express) => {
	app.all(
		"/graphql",
		cors({
			origin: "http://localhost:4200",
			credentials: true
		}),
		createHandler({
			schema: schema,
			rootValue: root,
		})
	);

	app.get("/", (_req, res) => {
		res.type("html");
		res.end(ruruHTML({ endpoint: "/graphql" }));
	});
};
