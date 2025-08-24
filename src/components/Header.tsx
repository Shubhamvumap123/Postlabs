
const Header = () => {
    return (
      <header style={{display:"contents"}} className="relative z-20 border-b border-black/10 w-full">
    <div className="relative z-10 py-5">
      <div
        className="
          grid grid-cols-[20%_1fr_1fr]
          auto-cols-fr
          items-center
          relative
          z-20
        "
      >
        {/* Logo */}
        <div style={{width:"100px"}} className="col-span-1 flex justify-center md:justify-start">
          <a
            href="/"
            aria-current="page"
            className="logo-link inline-block"
          >
            <img
              src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68227dfdc407523fbe5b56e7_post-labs-logo.svg"
              loading="lazy"
              alt="Post Labs logo"
              className="h-8 md:h-10"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
              }}
            />
          </a>
        </div>
<div></div>
        {/* Tagline */}
        <div className="col-span-1 flex justify-end items-center">
          <p
            className="
              text-black 
              text-sm md:text-base 
              leading-[140%] 
              max-w-[395px] 
              mb-0
            "
            data-animation="fadeup"
          >
            We’re building the backbone of Canadian digital media — a next-gen
            platform that gives creators the tools to thrive.
          </p>
        </div>
      </div>
    </div>
  </header>
    );
};



export default Header;