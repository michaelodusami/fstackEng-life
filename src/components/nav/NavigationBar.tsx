import { nav_items } from "@/lib/data/nav";
import { homeUrl } from "@/lib/data/common";

export default function NavigationBar() {
    return (
        <nav className="border-black border-b-2 p-4 flex justify-center mx-40">
            <ul className="flex space-x-6">
                {nav_items.map((nav, index) => (
                    <li key={index} className="hover:underline flex justify-center items-center">
                        <a href={homeUrl + nav.link} className="">
                            {nav.title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
