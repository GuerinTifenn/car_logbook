import Image from "next/image";
import home from "../public/assets/home.jpeg";

export default function Home() {
  return (
    <section>
      <div className="flex flex-col xl:flex-row m-8 gap-5">
        <div className="w-full xl:w-6/12">
          <Image
            src={home}
            alt="Image illustrating AutoLog features"
            width={800}
            height={600}
            className="w-full h-auto"
            priority={true}
          />
        </div>
        <div className="w-full xl:w-6/12 gap-5 flex flex-col">
          <h1 className="text-5xl text-center m-5">Welcome to AutoLog</h1>
          <p className="text-xl text-justify m-5">
            <b>
              Welcome to AutoLog, your digital tool for tracking vehicle
              maintenance and repair expenses.
            </b>
            <br />
            <br />
            AutoLog simplifies the management and recording of all interventions
            on your vehicles, whether it&apos;s repairs, maintenance, or
            modifications. Easily track costs, dates, and details of each
            operation, keeping a complete and clear history of your vehicle.{" "}
            <br />
            Our platform also allows you to transfer the vehicle to another
            user, automatically passing on the full maintenance history. <br />
            <br />
            No more hassle with paperwork - AutoLog offers a simple and
            efficient solution to stay organized and keep accurate records of
            your automotive expenses.
          </p>
        </div>
      </div>
    </section>
  );
}
