import AutoType from "@/components/AutoType";
import PaginationBtn from "@/components/PaginationBtn";

export default function RootPage() {
  return (
    <div className="p-8 h-screen w-full flex flex-col justify-center items-center gap-32">
      <div className="w-full min-h-12 text-center">
        <AutoType text={[["Welcome, I'm", "Dev", "Sahani"].join(" ")]} />
      </div>
      <PaginationBtn href="/home" className="special-btn">
        View My Assingment
      </PaginationBtn>
    </div>
  );
}
