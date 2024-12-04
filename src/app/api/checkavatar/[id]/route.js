import fs from 'fs';
export async function GET(request, { params }) {
    const { id } = params;
    const path = 'public/cache/avatar/';
    console.log(request.headers);  
    const headers = new Headers();
    headers.set('Content-Type', 'image/jpeg'); 
    const imageBuffer = fs.readFileSync(`${path}/${id}.jpg`);
    try{
        return new Response(imageBuffer, {
            status: 200,
            headers:{
                'Content-Type': 'image/jpeg',  
                'Content-Length': imageBuffer.length, 
            }
        })
    }
    catch(error){
        console.log(error);
    }
    /*
    return new Response(JSON.stringify({ message: `Avatar ID: ${id}` }), {
        status: 200,
        headers: headers,  // Attach the custom headers
    });
    */
}
