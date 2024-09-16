import executeQuery from "../player/[playerId]/dbinfo";

const SharpData = async () => {
    const mapresult = await executeQuery(`SELECT * FROM playerrecords`, []);
    return JSON.stringify(mapresult);
}


export default async function SharpTimerQuery() {
    const data = await SharpData();
    return data;
}
