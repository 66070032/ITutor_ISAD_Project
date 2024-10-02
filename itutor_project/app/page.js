// import Image from "next/image";
import Link from "next/link";
import { Irish_Grover } from "next/font/google";

const irishGrover = Irish_Grover({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <div className="bg-[url('./src/bg-home-org.svg')]  bg-center h-screen bg-cover">
        {/* ITutor LOGO */}
        <div className="flex justify-between items-center p-8">
          <div className={irishGrover.className}>
            <img className="logo h-8" src="/ITutor.svg" alt="logo" />
          </div>
          <div className="text-right">
            <Link href="/sign-in">
              <button className="px-3">SIGN IN</button>
            </Link>
            <Link href="/sign-up">
              <button className="px-3">SIGN UP</button>
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center h-[80vh] gap-1">
          <div className={irishGrover.className}>
            <span className="text-[#19588a] text-[80px] text-stroke-white">
              IT
            </span>
            <span className="text-white text-[80px] text-stroke-blue">
              UTOR
            </span>
          </div>

          <div>
            <p className="text-white text-lg">
              TYPE HERE FOR DESCRIBE THIS WEBSITE...
            </p>
          </div>

          <div className="mt-8">
            <Link href="#allCourse">
              <button className="bg-[#D9B4AE] rounded-2xl h-9 w-36 text-[#5E4E4B]">
                GET START
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div id="allCourse" className="bg-[#aed5f9] h-screen">
        <div className="flex mx-24 py-10 gap-10">
          <h1 className="text-[#19588a] underline text-2xl font-bold">ALL TOPIC</h1>
          <Link href="#">
            <button className="text-[#f8573c] text-2xl font-bold hover:underline">
              MY TOPIC
            </button>
          </Link>
        </div>

        {/*Card Of Topic*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mx-24">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden w-full h-[300px]">
            <img
              src="https://via.placeholder.com/300"
              alt="Card Image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-center">
                Card Title 1
              </h2>
              <p className="text-gray-700 text-center">
                This is a brief description of the card content.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <img
              src="https://via.placeholder.com/300"
              alt="Card Image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-center">
                Card Title 2
              </h2>
              <p className="text-gray-700 text-center">
                This is a brief description of the card content.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <img
              src="https://via.placeholder.com/300"
              alt="Card Image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-center">
                Card Title 3
              </h2>
              <p className="text-gray-700 text-center">
                This is a brief description of the card content.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <img
              src="https://via.placeholder.com/300"
              alt="Card Image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-center">
                Card Title 4
              </h2>
              <p className="text-gray-700 text-center">
                This is a brief description of the card content.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-xl overflow-hidden">
            <img
              src="https://via.placeholder.com/300"
              alt="Card Image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-center">
                Card Title 5
              </h2>
              <p className="text-gray-700 text-center">
                This is a brief description of the card content.
              </p>
            </div>
          </div>

          {/* Card 6 */}

          <div className="bg-white shadow-md rounded-xl flex justify-center items-center">
            <Link href="#">
              <div className="p-4">
                <h2 className="text-xl font-semibold text-center">SEE ALL</h2>
              </div>
            </Link>
          </div>

          {/* register */}
          <div className="h-10"></div>
        </div>
      </div>
    </div>
  );
}
