import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_vacation_requests_status" AS ENUM('pending', 'approved', 'rejected');
  CREATE TABLE IF NOT EXISTS "vacation_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"requester_id" integer NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL,
  	"reason" varchar,
  	"status" "enum_vacation_requests_status" DEFAULT 'pending' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users" ADD COLUMN "is_admin" boolean DEFAULT false;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "vacation_requests_id" integer;
  DO $$ BEGIN
   ALTER TABLE "vacation_requests" ADD CONSTRAINT "vacation_requests_requester_id_users_id_fk" FOREIGN KEY ("requester_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "vacation_requests_requester_idx" ON "vacation_requests" USING btree ("requester_id");
  CREATE INDEX IF NOT EXISTS "vacation_requests_updated_at_idx" ON "vacation_requests" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "vacation_requests_created_at_idx" ON "vacation_requests" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vacation_requests_fk" FOREIGN KEY ("vacation_requests_id") REFERENCES "public"."vacation_requests"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_vacation_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("vacation_requests_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "vacation_requests" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "vacation_requests" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_vacation_requests_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_vacation_requests_id_idx";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "is_admin";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "vacation_requests_id";
  DROP TYPE "public"."enum_vacation_requests_status";`)
}
