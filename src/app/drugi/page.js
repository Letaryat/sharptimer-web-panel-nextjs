import executeQuery from "@/lib/dbinfo";

export async function GET(request){
    const users = await executeQuery({
        query: "SELECT * FROM playerrecords ORDER BY TimerTicks DESC",
        values: [],
    });
    let data = JSON.stringify(users);
    return new Response(data,{
        status: 200,
    })
}