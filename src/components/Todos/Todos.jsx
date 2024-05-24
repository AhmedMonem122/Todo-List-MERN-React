import {
  MdEditSquare,
  MdDeleteForever,
  MdEditNote,
  MdDoneAll,
  MdRemoveDone,
} from "react-icons/md";

const Todos = () => {
  return (
    <div className="lg:w-1/2 my-[50px] mx-auto p-[20px] rounded-2xl bg-gradient-to-tl from-[#1c1c5a] to-[#8b8080]">
      <div className="flex items-center justify-between text-center font-semibold  md:text-3xl mb-10 text-white">
        <p>My Todo</p>
        <div className="flex items-center justify-center gap-x-4">
          <button className="flex items-center justify-center rounded-full bg-slate-50 text-purple-700 w-[25px] h-[25px] md:w-[40px] md:h-[40px] hover:bg-purple-700 hover:text-slate-50 transition-all">
            <MdEditSquare />
          </button>

          <button className="flex items-center justify-center rounded-full bg-slate-50 text-purple-700 w-[25px] h-[25px] md:w-[40px] md:h-[40px] hover:bg-purple-700 hover:text-slate-50 transition-all">
            <MdDeleteForever />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between text-center font-semibold  md:text-3xl mb-10 text-white">
        <p>My Todo</p>
        <div className="flex items-center justify-center gap-x-4">
          <button className="flex items-center justify-center rounded-full bg-slate-50 text-purple-700 w-[25px] h-[25px] md:w-[40px] md:h-[40px] hover:bg-purple-700 hover:text-slate-50 transition-all">
            <MdEditSquare />
          </button>

          <button className="flex items-center justify-center rounded-full bg-slate-50 text-purple-700 w-[25px] h-[25px] md:w-[40px] md:h-[40px] hover:bg-purple-700 hover:text-slate-50 transition-all">
            <MdDeleteForever />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todos;
