'use client'
import { Info } from "./info";
import { DataTableDemo } from "./tabel";
export default function Player() {
  return (
    <div>
      <h3 className="font-semibold text-xl mb-1">Records list </h3>
      <DataTableDemo/>
    </div>
  );
}
