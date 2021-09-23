import classes from "./hero.module.css";
import Image from "next/image";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/myImage.jpg"
          alt="An image showing shantanu"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi I am Shantanu</h1>
      <p>
        I blog about web development - especially frontend frameworks like
        Angular or React.
      </p>
    </section>
  );
}

export default Hero;
