import { db } from "@/db";
import { departments, events, faculty, programmes, users } from "@/db/schema";
import cors from "cors";
import { eq, sql } from "drizzle-orm";
import { Express } from "express";
import { buildSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";

const schema = buildSchema(`
	scalar JSON
	type Programme {
		id: ID
		code: String
		title: String
		level: Int
		faculty: String
		department: String
		initiator: ID
		initiatorFirstName: String
		initiatorLastName: String
	}
	
	type Events{
		id:ID
		title:String
		date:String
	}

	type Query { 
		events(date: String!): [Events]
		programmes(id: String): [Programme]
		programme_phase_step(programmeId:String, phaseSlug:String): JSON 
	}
	
`);

const root = {
	programmes({ id }) {
		if (id) {
			return db.select(
				{
					id: programmes.id,
					code: programmes.code,
					title: programmes.title,
					level: programmes.level,
					initiator: programmes.initiator,
					initiatorFirstName: users.firstName,
					initiatorLastName: users.lastName,
					department: departments.name,
					faculty: faculty.name
				}
			).from(programmes).where(eq(programmes.id, id))
				.innerJoin(users, eq(users.id, programmes.initiator))
				.innerJoin(departments, eq(programmes.department, departments.id))
				.innerJoin(faculty, eq(programmes.faculty, faculty.id));
		} else {
			return db.select(
				{
					id: programmes.id,
					code: programmes.code,
					title: programmes.title,
					level: programmes.level,
					initiator: programmes.initiator,
					initiatorFirstName: users.firstName,
					initiatorLastName: users.lastName,
					department: departments.name,
					faculty: faculty.name
				}
			).from(programmes)
				.innerJoin(users, eq(users.id, programmes.initiator))
				.innerJoin(departments, eq(programmes.department, departments.id))
				.innerJoin(faculty, eq(programmes.faculty, faculty.id));
		}
	},
	async programme_phase_step({ programmeId, phaseSlug }) {

		console.log("ID ", programmeId);

		const data = await db.execute(
			sql`SELECT fn_get_programme_phase_step(
				${programmeId},
				${phaseSlug}
				) AS data`
		);

		console.log("Data ", data);


		return data.rows[0]?.data
	},
	events({ date }) {
		return db.select().from(events).where(eq(events.date, date))
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
