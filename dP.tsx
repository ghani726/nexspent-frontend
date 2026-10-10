// {
//     /* Decimal Precision */
// }
// <div className="w-full font-medium text-xl flex justify-center items-center gap-2">
//     <h3 className="text-xl font-bold">Decimal Precision:</h3>
//     <div className="flex justify-center items-center gap-1">
//         <button
//             onClick={() => {
//                 setDP((prev) => prev - 1);
//                 setShowDialPad(false);
//             }}
//             disabled={dP === 0 ? true : false}
//             className="disabled:bg-red-300 dark:disabled:bg-red-400 disabled:cursor-not-allowed bg-red-500 text-white mt-1 cursor-pointer active:scale-95 duration-300 ease-in-out rounded-full p-1"
//         >
//             <Minus strokeWidth={3.5} size={12}></Minus>
//         </button>

//         <span
//             className={`font-bold text-3xl rounded-xl cursor-pointer active:scale-95 duration-300 ease-in-out`}
//         >
//             {dP}
//         </span>
//         <button
//             onClick={() => {
//                 setDP((prev) => prev + 1);
//                 setShowDialPad(false);
//             }}
//             disabled={dP === 9 ? true : false}
//             className="bg-primary text-white mt-1 cursor-pointer active:scale-95 duration-300 disabled:cursor-not-allowed disabled:bg-secondary ease-in-out rounded-full p-1"
//         >
//             <Plus strokeWidth={3.5} size={12}></Plus>
//         </button>
//     </div>
// </div>;
