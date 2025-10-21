import * as schema from "./schema";
import { db } from "./index";
import { seed } from "drizzle-seed";

await seed(db, schema).refine((f) => ({
    programmes: {
        columns: {
            level: f.int({
                minValue: 5,
                maxValue: 9,
            }),
        },
    },
}));
