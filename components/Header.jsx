export default function Header() {
  return (
    <div className="w-11/12 max-w-8xl mx-auto min-h-[calc(100vh-5rem)] flex flex-col gap-10 pt-48 pb-12">
      <div className="w-full flex items-center justify-between gap-4 font-Ovo text-[clamp(2.5rem,10vw,8rem)] leading-none tracking-[-0.02em]">
        <span className="flex-1 text-left whitespace-nowrap">Okiemute</span>
        <span className="flex-1 text-right whitespace-nowrap">
          Egokiphovwen
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="rounded-[32px] overflow-hidden border border-gray-200 bg-white">
          <img
            src="/assets/me.jpg"
            alt="Portrait of Okiemute Egokiphovwen"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="rounded-[32px] text-darkHover border border-gray-200 bg-white p-8 sm:p-10 flex flex-col justify-center gap-6 text-center lg:text-left">
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-Ovo">
            A software developer and{" "}
            <span className="inline-flex items-center px-4 py-1 border border-gray-300 rounded-full">
              builder
            </span>
            .
          </h1>

          <p className="max-w-2xl mx-auto lg:mx-0 font-Ovo">
            I am a software developer from Lagos, Nigeria with 7 years of
            experience in multiple companies like Anfanifi, Flextable and
            Caresync.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 justify-center lg:justify-start">
            <a
              href="mailto:contact@okiemute.cv"
              className="px-10 py-2.5 border rounded-full bg-gradient-to-r from-[#000000] to-[#080020] text-white flex items-center gap-2 dark:border-transparent"
            >
              Start a project
              <img src="/assets/right-arrow-white.png" alt="" className="w-4" />
            </a>

            <a
              href="https://docs.google.com/document/d/1CC8IsiA3_rZtvzeEG5cMskKps351PSnAUdUrxdJ6BUY/edit?usp=sharing"
              download
              className="px-10 py-2.5 rounded-full bg-darkHover text-white  border border-gray-300 flex items-center gap-2"
            >
              my resume{" "}
              <img
                src="/assets/download-icon.png"
                alt=""
                className="w-4 dark:invert"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
