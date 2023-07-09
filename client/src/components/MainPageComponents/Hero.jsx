import { motion } from "framer-motion";
import { SectionWrapper } from "../../hoc";
import { styles } from "../../styles";
const Hero = () => {
  return (
    <div className={`relative w-full h-screen mx-0 `}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col gap-5 w-2/5 pt-40">
          <div className="text-5xl">Fast Food Restaurant</div>
          <div className="">
            Welcome to DreamFlare, where fast food dreams come true! Indulge in
            our mouth watering menu filled with delectable delights that will
            leave you craving for more.{" "}
          </div>
          <button className="bg-yellow-500 py-3 px-10 w-44 rounded-3xl text-primary">Order now</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
