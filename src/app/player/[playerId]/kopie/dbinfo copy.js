import mysql from "mysql2/promise";

const executeQuery = async (query,data) => {
    try{
        const db = await mysql.createConnection({
            host: "localhost",
            port: "3306",
            database: "db_98989",
            user: "root",
            password: ""
        });
    const [result] = await db.execute(query,data);
    db.end();
    return result;
    } catch (error){
        return null;
    }
}
    
export default executeQuery;