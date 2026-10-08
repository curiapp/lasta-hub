## Database Update Process

We use **Drizzle Kit** to manage and synchronize database schemas across environments.
When a database schema update occurs, developers must refresh their local database models accordingly.

> **Note:** Ensure that **Tailscale VPN** is running before proceeding.
> The database is only accessible through the VPN.

### Steps

1. **Pull the latest schema changes**

   ```bash
   npx drizzle-kit pull
   ```

   This command updates the contents of the `drizzle/` folder.

2. **Copy updated model files**
   From the `drizzle/` folder, copy the following files into `src/db/`:

   * `schema.ts`
   * `relations.ts`

3. **Fix import references**
   In the copied `relations.ts` file, update the import path for `schema.ts` as shown below:

   ```ts
   // Before
   import { ... } from "../drizzle/schema";

   // After
   import { ... } from "./schema";
   ```

4. **Verify build**
   Run your application or build process to ensure there are no import or schema re


