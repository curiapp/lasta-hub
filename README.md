# Curriculum Development Automation

The aim of this application is to capture and automate the curriculum development process. The process starts from a faculty (actually some members) identifying a need for introducing a new curriculum. After a careful analysis of the needs followed by a conclusive market survey, the curriculum development properly begins. First, the faculty must seek authorisation from the Board of Study (BOS) and the Senate. Then, a committee is put in place to deliver on the actual curriculum development. This curriculum development takes place within a well organised process which is subject to automation. At the end of the process, and with the approval of BOS and Senate, the new curriculum is then submitted to the National Qualification Authority (NQA) for approval and registration.

Furthermore, this application supports a similar process for curriculum revision.

## Key Functionality
Below are some of the functionality the application must fulfil:

* Curriculum development workflow implementation
* Resource management for curriculum development
* Communication management during curriculum development
* Tutorial for curriculum development

## Contributors
coming soon...

## Build and Run Images
**Frontend**
```powershell
docker build -f Dockerfile.frontend -t pdqa-frontend .

docker run -d pdqa-frontend
```

**Backend**
```powershell
docker build -f Dockerfile.backend -t pdqa-backend .

docker run -e KAFKA_BROKER_HOST=host.docker.internal:9092 -p 4931:4931 pdqa-backend
```

## License
to be determined...

## Acknowledgment 
coming soon...

# Development Environment
### Prerequisites
- Node.js ≥ 18
- PostgreSQL ≥ 13
- npm or yarn
- Angular CLI (for frontend)


### Clone the Repository
`git clone https://github.com/curiapp/lasta-hub.git`

## Backend Setup
```cd server.js
npm install
```

### Configure environment variables
Create a .env file:
``` DATABASE_URL=postgres://username:password@localhost:5432/universitydb
PORT=3000
```


### Drizzle ORM Setup

Install Drizzle and Drizzle Kit:
```
npm install drizzle-orm drizzle-kit pg
```

Create drizzle.config.ts:
```
import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",       // Path to Drizzle schema file
  out: "./db/migrations",         // Folder for migrations
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
```
npx drizzle-kit introspect

Generate schema from the existing database:

```
npx drizzle-kit introspect
```

This will generate `db/schema.ts` with all your tables (`faculty`, `department`, `users`, `programme_phases`, `phase_steps`, `programme_phase_steps`).

Run backend server
```
npm run dev
```
- The backend runs on http://localhost:3000
- GraphQL endpoint: http://localhost:3000/graphql


## Frontend Setup (Angular)

### Install dependencies
```
cd client
npm install
```

Configure environment
Edit `src/environments/environment.ts`:

```
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

Run Angular app

```
ng serve /
yarn dev
```

