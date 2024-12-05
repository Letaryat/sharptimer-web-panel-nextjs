import mysql from "mysql2/promise";

const executeQuery = async (query,data) => {
    try{
        const db = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            database: process.env.MYSQL_DB,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS
        });
    const [result] = await db.execute(query,data);
    db.end();
    return result;
    } catch (error){
        return null;
    }
}
    
export default executeQuery;