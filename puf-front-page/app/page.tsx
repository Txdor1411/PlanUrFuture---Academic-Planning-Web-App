import Image from "next/image";
import Spline from "@splinetool/react-spline/next";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <section className="flex h-[120vh] items-end justify-center px-6 pb-16">
        <h1 className="text-4xl font-semibold text-zinc-900 dark:text-white">
          Scroll down
        </h1>
      </section>

      <main className="sticky top-0 h-screen w-screen">
        <Spline scene="https://prod.spline.design/wqMglzhYP3L6Uy-p/scene.splinecode" />
      </main>

      <section className="h-[200vh]" />
    </div>
  );
}
