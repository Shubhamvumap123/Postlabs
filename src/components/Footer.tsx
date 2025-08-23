import { useEffect,useState } from "react";

export default function Footer() {
    const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      setAtBottom(bottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
   
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes marquee-horizontal {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      .marquee-inner {
        animation: marquee-horizontal 30s linear infinite;
        white-space: nowrap;
        will-change: transform;
      }
      .marquee-inner:hover {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const email = formData.get("email") as string;

  try {
    const response = await fetch(
      "https://YOUR_DC.api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "apikey YOUR_API_KEY"
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed"
        }),
      }
    );

    if (response.ok) {
      alert(`Thanks for signing up, ${email}!`);
      e.currentTarget.reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("Error signing up. Please try again later.");
  }
};


  return (
    <footer    className={`bg-black text-white transition-all duration-700 ease-in-out z-50 
        ${atBottom ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}
      `}>
      {/* Marquee */}
      <div className="relative flex w-full overflow-hidden justify-start items-center py-16 md:py-10">
        <div className="marquee-inner absolute flex items-center gap-5">
          <div className="flex items-center gap-5">
            <span className="text-lg md:text-base">
              Ready to Build the Future of Canadian Media?{' '}
              <a href="/contact-us" className="underline underline-offset-4">
                Contact Us
              </a>
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="57"
              height="57"
              viewBox="0 0 57 57"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M5.09082 0.823242L50.0605 45.7861L49.667 2.61621L49.665 2.36133L49.9199 2.36426L55.5625 2.42969L55.8076 2.43262L55.8096 2.67773L56.25 55.998L56.252 56.252L55.998 56.25C49.1732 56.1848 39.2577 56.1118 29.3418 56.0303L29.0938 56.0273V56.0107C19.2533 55.93 9.4295 55.8577 2.66113 55.793L2.41699 55.791L2.41309 55.5479L2.32422 49.9463L2.31934 49.6895L2.57617 49.6924C8.9767 49.7576 16.4211 49.815 24.0859 49.8721L34.5908 49.9512L44.9131 50.043L45.791 50.0527L0.823242 5.08984L0.646484 4.91309L0.823242 4.73633L4.7373 0.823242L4.91406 0.646484L5.09082 0.823242Z"
                fill="white"
                stroke="white"
                strokeWidth="0.5"
              />
            </svg>
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex items-center gap-5">
            <span className="text-lg md:text-4xl">
              Ready to Build the Future of Canadian Media?{' '}
              <a href="/contact-us" className="underline underline-offset-4">
                Contact Us
              </a>
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="57"
              height="57"
              viewBox="0 0 57 57"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M5.09082 0.823242L50.0605 45.7861L49.667 2.61621L49.665 2.36133L49.9199 2.36426L55.5625 2.42969L55.8076 2.43262L55.8096 2.67773L56.25 55.998L56.252 56.252L55.998 56.25C49.1732 56.1848 39.2577 56.1118 29.3418 56.0303L29.0938 56.0273V56.0107C19.2533 55.93 9.4295 55.8577 2.66113 55.793L2.41699 55.791L2.41309 55.5479L2.32422 49.9463L2.31934 49.6895L2.57617 49.6924C8.9767 49.7576 16.4211 49.815 24.0859 49.8721L34.5908 49.9512L44.9131 50.043L45.791 50.0527L0.823242 5.08984L0.646484 4.91309L0.823242 4.73633L4.7373 0.823242L4.91406 0.646484L5.09082 0.823242Z"
                fill="white"
                stroke="white"
                strokeWidth="0.5"
              />
            </svg>
          </div>
        </div>
      </div>
<div className="flex items-start p-5 mb-5">
          <a href="/">
            <img
              src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/682786273e6c31f3343c6700_postlabs-logo-white.svg"
              alt="Post Labs logo"
              className="max-w-[160px]"
            />
          </a>
        </div>
      {/* Grid Layout */}
      <div className="grid grid-cols-[20%_1fr_1fr_20%] md:grid-cols-[40px_1fr_1fr_40px] sm:grid-cols-[20px_1fr_1fr_20px] gap-0">
        {/* Logo */}
        

        {/* Links + Newsletter */}
        <div className="col-span-2 flex flex-col gap-4 px-5 py-5">
          <ul className="flex flex-col gap-2 text-base">
            <li><a href="/#top" className="underline underline-offset-4">About</a></li>
            <li><a href="/contact-us" className="underline underline-offset-4">Contact</a></li>
            <li><a href="/privacy-policy" className="underline underline-offset-4">Privacy Policy</a></li>
            <li><a href="#" className="underline underline-offset-4">Cookie Policy</a></li>
          </ul>
          <h2 className="text-xl font-semibold">Sign Up for Our Newsletter</h2>
          <form className="flex gap-2 max-w-md" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              className="flex-1 px-3 py-2 text-black rounded-md outline-none"
            />
            <button
              type="submit"
              className="px-5 bg-white text-black rounded-md font-medium"
            >
              →
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/40 px-10 py-5 gap-2">
        <div>© 2025 Post Labs, Inc. All rights reserved.</div>
        <div>
          Designed by{' '}
          <a href="https://gohrvst.com" target="_blank" className="underline">
            HRVST
          </a>
        </div>
      </div>
      
    </footer>
  );
}
