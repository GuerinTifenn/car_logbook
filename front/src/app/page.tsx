import Image from "next/image";
import home from "../public/assets/home.jpeg";

export default function Home() {
  return (
    <section>
      <div className="flex flex-col xl:flex-row m-8 gap-5">
        <div className="w-full xl:w-6/12">
          <Image
            layout="responsive"
            src={home}
            width={100}
            height={100}
            alt="home logo"
          />
        </div>
        <div className="w-full xl:w-6/12 gap-5 flex flex-col">
          <h1 className="text-5xl text-center m-5">Welcome to AutoLog</h1>
          <p className="text-lg m-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            commodo sem ante, non gravida leo placerat sed. Nulla a felis
            lectus. <br />
            <br />
            Donec at tempor quam. Vivamus et elementum dolor, eu porta ante.
            Nulla eros risus, vestibulum nec libero vel, imperdiet finibus est.
            Mauris non finibus leo. Sed a dignissim massa. Aenean porta auctor
            ipsum, et feugiat orci luctus sit amet. Maecenas at nulla quis massa
            vulputate eleifend a sed magna. Mauris nec condimentum elit. Integer
            vitae arcu dui. Duis purus nunc, tristique a vehicula eu, commodo
            sed leo.
          </p>
        </div>
      </div>
    </section>
  );
}
