// Non tailwind font
// import { orbitron } from "@/app/fonts";

export default function Heading({ children }) {
  return <h1 className='font-bold font-orbitron pb-3 text-2xl'>{children}</h1>;

  // non tailwind font
  // <h1 className={`font-bold pb-3 text-2xl ${orbitron.className}`}>{children}</h1>;
}
