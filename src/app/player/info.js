import SharpFetcher from "../api/sharpfetch/route";
async function GetInfo() {
  let Fetcher = await SharpFetcher();
  return (
    <>
      <div>
        {Fetcher.filter((obj) => obj.MapName.includes("surf_")).map((d, i) => {
          return (
            <p>
              {i} | {d.MapName}
            </p>
          );
        })}
      </div>
    </>
  );
}

export async function Info(){
  let Fetcher = await SharpFetcher();

  return Fetcher;
}
