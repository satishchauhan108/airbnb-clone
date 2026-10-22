import fs from "fs";

const path = "src/data/candolimListing.ts";
let s = fs.readFileSync(path, "utf8");
s = s.replace(/â‚¹/g, "₹");
s = s.replace(/â€™/g, "'");
s = s.replace(/â€”/g, "—");
fs.writeFileSync(path, s, "utf8");
console.log("rupee count", (s.match(/₹/g) || []).length);
console.log("bad remaining", (s.match(/â/g) || []).length);
