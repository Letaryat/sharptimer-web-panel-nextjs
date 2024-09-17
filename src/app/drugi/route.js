export const dynamic = "force-static";
import executeQuery from "../../lib/dbinfo";
export async function GET() {
  const mapresult = await executeQuery(`SELECT * FROM playerrecords ORDER BY TimerTicks ASC`, []);
  return Response.json({ mapresult });
}
