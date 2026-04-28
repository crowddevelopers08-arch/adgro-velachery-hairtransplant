"use client";

import { Instagram } from "lucide-react";

const instagramPosts = [
  {
    id: "DXBK5T3y51N",
    url: "https://www.instagram.com/p/DXBK5T3y51N/",
    label: "Instagram transformation video 1",
  },
  {
    id: "DXgH3ONyrl-",
    url: "https://www.instagram.com/p/DXgH3ONyrl-/",
    label: "Instagram transformation video 2",
  },
];

export default function InstagramReelsSection() {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-3xl max-[470px]:mb-6 text-center lg:mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#de2225]/20 bg-[#de2225]/5 px-4 py-2 text-sm font-semibold text-[#de2225]">
            <Instagram className="h-4 w-4" />
            Real Instagram Results
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Watch Recent Hair
            <span className="text-[#de2225]"> Transformation Videos</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
            Explore real patient moments and see how the journey looks beyond static before-and-after images.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-4">
          {instagramPosts.map((post) => (
            <article
              key={post.id}
              className="w-full max-w-[360px] rounded-[28px] border border-[#f0d7d7] bg-gradient-to-b from-white to-[#fff7f7] p-4 shadow-[0_18px_60px_-24px_rgba(222,34,37,0.22)]"
            >
              <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[6px] bg-white">
                <iframe
                  src={`${post.url}embed`}
                  title={post.label}
                  className="h-[545px] w-full border-0"
                  allowTransparency={true}
                  allowFullScreen
                  scrolling="no"
                  loading="eager"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
