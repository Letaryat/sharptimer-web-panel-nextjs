
export default async function SharpFetcher(){
    const response = await fetch(`http://localhost:3000/drugi`);
    if(!response.ok){return}
    else{
        const data = await response.json();
        return await data.mapresult;
    }

}