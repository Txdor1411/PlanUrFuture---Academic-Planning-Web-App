import Spline from '@splinetool/react-spline/next';

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden">
      <Spline
        scene="https://prod.spline.design/CBN01NL5R6X8ugvj/scene.splinecode"
        className="h-full w-full"
      />
    </main>
  );
}
