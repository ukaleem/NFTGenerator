// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { f1 } from "../../lib/db";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
export default function handler(req, res) {

  // for(let i =0 ;i< 100; i++){
  //   console.log(getRndInteger(0, 2));
  // }
  res.status(200).json({ name: 'John Doe' })
}
