export default function Footer() {
  return (
    <footer className="bg-[#f7f6f2]">
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-8 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-3 border-t border-[#e2ddd2] pt-5 text-[10px] uppercase tracking-[0.22em] text-[#a09b90] sm:flex-row sm:items-center sm:justify-between">
          <p>(c) {new Date().getFullYear()} Okiemute Egokiphovwen</p>
          <p>Site constantly changing.</p>
        </div>
      </div>
    </footer>
  );
}
