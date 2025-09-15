import hero from "@/assets/images/background/hero.png";

function Hero() {
    return (
        <div className="w-full">
            <img src={hero} alt="Hero" className="h-auto w-full object-cover" />
        </div>
    );
}

export default Hero;
