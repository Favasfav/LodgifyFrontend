import { Typography } from "@material-tailwind/react";
 
const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];
 
const currentYear = new Date().getFullYear();
 
export default function Footer() {
  return (
    <footer className=" footer relative w-full bg-blue-gray-900">
    <div className="mx-auto w-full max-w-7xl px-8">
      <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
        <Typography variant="h5" className="mb-6 font-bold text-white"> {/* Add 'font-bold' class for bold text */}
          Book Rooms
        </Typography>
        <div className="grid grid-cols-3 justify-between gap-4">
          {LINKS.map(({ title, items }) => (
            <ul key={title}>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-3 text-lg font-bold  text-white"
              >
                {title}
              </Typography>
              {items.map((link) => (
                <li key={link}>
                  <Typography
                    as="a"
                    href="#"
                    color="gray"
                    className="py-1.5 font-normal transition-colors hover:text-blue-gray-900 text-white"
                  >
                    {link}
                  </Typography>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
        <Typography
          variant="small"
          className="mb-4 text-center font-normal text-white md:mb-0"
        >
          &copy; {currentYear} <a href="https://material-tailwind.com/" className="text-white"> BookRooms</a>. All
          Rights Reserved.
        </Typography>
        <div className="flex gap-4 text-white sm:justify-center">
          <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {/* Your SVG path */}
            </svg>
          </Typography>
          <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {/* Your SVG path */}
            </svg>
          </Typography>
          <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              
            </svg>
          </Typography>
        </div>
      </div>
    </div>
  </footer>
  

  );
}