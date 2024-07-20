export default function Navbar() {
  return (
    <nav className="w-full h-24 px-8 py-4 flex justify-between items-center border-b border-secondary">
      <div className="flex items-center gap-4">
        {/* <Image src="" alt="logo" /> */}
        <div className="w-16 h-16 rounded-full bg-black"></div>
        <h1 className="pb-2 text-5xl text-primary font-bold">Cryptonite</h1>
      </div>
      <div className="flex gap-2 items-center">
        {/*  Avatars */}
        <div className="w-8 h-8 bg-black rounded-full"></div>
        <p className="text-xl">Dev Sahani</p>
      </div>
    </nav>
  );
}
