import { Divide, Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsBackspace } from "react-icons/bs";

const DialPad = ({
  text = "Amount",
  input = 0,
  setInput,
  currencySymbol = "Rs",
  dP = 0,
  showModal,
  setShowModal,
  showTools = true,
}) => {
  const [value, setValue] = useState(input);

  const [secondaryValue, setSecondaryValue] = useState(String(input));
  const [displayValue, setDisplayValue] = useState("");
  const [showDisplayValue, setShowDisplayValue] = useState("");

  // NumPad Logic
  useEffect(() => {
    let premadeArray = null; //eslint-disable-line

    // If secondary value is empty set it to 0.
    if (secondaryValue === "") {
      setSecondaryValue("0"); //eslint-disable-line
    }

    // If hidden input incldued oprators, then do this
    if (
      secondaryValue.includes("+") ||
      secondaryValue.includes("-") ||
      secondaryValue.includes("*") ||
      secondaryValue.includes("/")
    ) {
      premadeArray = secondaryValue.split("");

      for (let i = 0; i < premadeArray.length; i++) {
        const previousElement = secondaryValue[i - 1];
        const nextElement =
          i === premadeArray.length - 1 ? null : secondaryValue[i + 1];
        const element = secondaryValue[i];

        // If element is an operator, do this.
        if (
          element === "+" ||
          element === "-" ||
          element === "*" ||
          element === "/"
        ) {
          // If user puts a an operator in start, remove it
          if (i === 0) {
            premadeArray.splice(i, 1);
          }
          // If there is already an operator before replace it with new one.
          if (
            previousElement === "+" ||
            previousElement === "-" ||
            previousElement === "*" ||
            previousElement === "/"
          ) {
            premadeArray.splice(i - 1, 1);
          }
          //   If Element is Point
        } else if (element === ".") {
          // If DP is zero prevent "."
          if (dP === 0 && element === ".") {
            premadeArray.pop();
            toast.error(
              "You can't add floating point numbers, as Decimal Precision is set to 0",
            );
          }
          //   If there is already an point, prevent this.
          if (previousElement === ".") premadeArray.splice(i - 1, 1);
          //   If elemnt is a number
        } else {
          // If starting elemnt is 0 and next elemnet is a number, remove 0
          if (premadeArray[0] === "0" && /(?=.*\d)/.test(premadeArray[1])) {
            premadeArray.shift();
          }

          //   If current elemnt is 0, and previous elemnt was an oprator and next elemnt is not a number like 2+03,
          if (
            element === "0" &&
            (previousElement === "+" ||
              previousElement === "-" ||
              previousElement === "*" ||
              previousElement === "/")
          ) {
            // If nextElemnt is a number, remove the current 0.
            if (nextElement && nextElement !== ".") {
              premadeArray.splice(i, 1);
              // If next elemnt is a point, keep it.
            } else if (nextElement && nextElement === ".") {
              continue;
            }
          }
        }
      }

      // Convert output from array to string
      setSecondaryValue(premadeArray.join(""));

      // Replace typicall symbols with good ones and show result
      const val = premadeArray.map((e) =>
        e === "*" ? "x" : e === "/" ? "/" : e,
      );
      setDisplayValue(val.join(""));
      setShowDisplayValue(true);

      // If there is no operator at last, do the desired calculation
      if (premadeArray?.length === 0 || !premadeArray) return;

      if (
        premadeArray[premadeArray.length - 1] !== "+" &&
        premadeArray[premadeArray.length - 1] !== "-" &&
        premadeArray[premadeArray.length - 1] !== "*" &&
        premadeArray[premadeArray.length - 1] !== "/" &&
        premadeArray[premadeArray.length - 1] !== "."
      ) {
        try {
          const result = eval(premadeArray.join("")); //eslint-disable-line
          setValue(result);
        } catch (err) { // eslint-disable-line
          toast.dismissAll();
          toast.error(
            `You entered an incorrect decimal number which is mathematically incorrect. Please enter correct values.`,
          );
          setValue(0);
          setSecondaryValue("");
          setDisplayValue("");
          setShowDisplayValue(false);
        }
      }

      return;
    }

    // If user entred extra point, throw an error to him.
    if (isNaN(secondaryValue)) {
      toast.dismissAll();
      toast.error(
        `You entered an incorrect decimal number which is mathematically incorrect. Please enter correct values.`,
      );
      setValue(0);
      setSecondaryValue("");
      setDisplayValue("");
      setShowDisplayValue(false);
      return;
    }

    // Finaaly set main value
    setValue(Number(secondaryValue));
  }, [secondaryValue]); // eslint-disable-line

  //   If DP changes, reset values.
  useEffect(() => {
    setSecondaryValue("0"); // eslint-disable-line
    setDisplayValue("");
  }, [dP]);
  return (
    <div
      className={`flex ${showModal ? "translate-y-0" : "translate-y-120"} transition-all ms:bottom-4 md:bottom-4 ms:rounded-4xl ease-in-out duration-300 flex-col absolute bottom-0 w-full left-1/2 -translate-x-1/2 max-w-125 p-4 gap-4 z-50 rounded-t-4xl bg-surface dark:bg-gray-800 shadow-large`}
    >
      <h2 className="px-1 font-bold text-3xl text-primary dark:text-primary-300">
        Enter {text}
      </h2>
      <div
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={`flex justify-end items-center w-full text-3xl font-bold ${value || secondaryValue.length > 1 ? "text-black dark:text-white" : "text-gray-600"}`}
      >
        {currencySymbol}
        {dP > 0 ? value.toFixed(dP) : Math.round(value)}
      </div>
      {showDisplayValue && (
        <div className="w-full -my-3 leading-snug">{displayValue}</div>
      )}
      <div
        className={`gap-1 p-2 grid ${showTools ? "grid-cols-4" : "grid-cols-3"} grid-rows-4 w-full rounded-4xl bg-secondary`}
      >
        <button
          title="7"
          className="w-full h-10 flex justify-center cursor-pointer items-center duration-300 active:scale-90 ease-in-out hover:bg-secondary/70 rounded-full text-2xl"
          onClick={() => setSecondaryValue((prev) => prev + "7")}
        >
          7
        </button>
        <button
          title="8"
          className="w-full h-10 flex justify-center cursor-pointer items-center duration-300 active:scale-90 ease-in-out hover:bg-secondary/70 rounded-full text-2xl"
          onClick={() => setSecondaryValue((prev) => prev + "8")}
        >
          8
        </button>
        <button
          title="9"
          className="w-full h-10 flex justify-center cursor-pointer items-center duration-300 active:scale-90 ease-in-out hover:bg-secondary/70 rounded-full text-2xl"
          onClick={() => setSecondaryValue((prev) => prev + "9")}
        >
          9
        </button>
        {showTools && (
          <button
            title="Divide"
            className="w-full h-10 flex justify-center cursor-pointer items-center duration-300 active:scale-90 ease-in-out hover:bg-secondary/70 rounded-full text-2xl"
            onClick={() => setSecondaryValue((prev) => prev + "/")}
          >
            <Divide></Divide>
          </button>
        )}
        <button
          title="4"
          className="w-full h-10 flex justify-center cursor-pointer items-center duration-300 active:scale-90 ease-in-out hover:bg-secondary/70 rounded-full text-2xl"
          onClick={() => setSecondaryValue((prev) => prev + "4")}
        >
          4
        </button>
        <button
          title="5"
          className="w-full h-10 flex justify-center cursor-pointer items-center duration-300 active:scale-90 ease-in-out hover:bg-secondary/70 rounded-full text-2xl"
          onClick={() => setSecondaryValue((prev) => prev + "5")}
        >
          5
        </button>
        <button
          title="6"
          className="w-full h-10 flex justify-center cursor-pointer items-center duration-300 active:scale-90 ease-in-out hover:bg-secondary/70 rounded-full text-2xl"
          onClick={() => setSecondaryValue((prev) => prev + "6")}
        >
          6
        </button>
        {showTools && (
          <button
            title="Multiply"
            className="w-full h-10 flex justify-center cursor-pointer items-center duration-300 active:scale-90 ease-in-out hover:bg-secondary/70 rounded-full text-2xl"
            onClick={() => setSecondaryValue((prev) => prev + "*")}
          >
            <X></X>
          </button>
        )}
        <button
          title="1"
          className="w-full h-10 flex justify-center cursor-pointer items-center duration-300 active:scale-90 ease-in-out hover:bg-secondary/70 rounded-full text-2xl"
          onClick={() => setSecondaryValue((prev) => prev + "1")}
        >
          1
        </button>
        <button
          title="2"
          className="w-full h-10 flex justify-center cursor-pointer items-center duration-300 active:scale-90 ease-in-out hover:bg-secondary/70 rounded-full text-2xl"
          onClick={() => setSecondaryValue((prev) => prev + "2")}
        >
          2
        </button>
        <button
          title="3"
          className="w-full h-10 flex justify-center cursor-pointer items-center duration-300 active:scale-90 ease-in-out hover:bg-secondary/70 rounded-full text-2xl"
          onClick={() => setSecondaryValue((prev) => prev + "3")}
        >
          3
        </button>
        {showTools && (
          <button
            title="Subraact"
            className="w-full h-10 flex justify-center cursor-pointer items-center duration-300 active:scale-90 ease-in-out hover:bg-secondary/70 rounded-full text-2xl"
            onClick={() => setSecondaryValue((prev) => prev + "-")}
          >
            <Minus></Minus>
          </button>
        )}
        <button
          disabled={!dP}
          title="Point"
          className="w-full h-10 flex justify-center cursor-pointer items-center duration-300 active:scale-90 ease-in-out hover:bg-secondary/70 rounded-full text-2xl"
          onClick={() => setSecondaryValue((prev) => prev + ".")}
        >
          .
        </button>
        <button
          title="0"
          className="w-full h-10 flex justify-center cursor-pointer items-center duration-300 active:scale-90 ease-in-out hover:bg-secondary/70 rounded-full text-2xl"
          onClick={() => setSecondaryValue((prev) => prev + "0")}
        >
          0
        </button>
        <button
          title="Backspace"
          className="w-full h-10 flex justify-center cursor-pointer items-center duration-300 active:scale-90 ease-in-out hover:bg-secondary/70 rounded-full text-2xl"
          onClick={() => {
            setSecondaryValue((prev) => prev.slice(0, -1));
            setDisplayValue((prev) => prev.slice(0, -1));
          }}
        >
          <BsBackspace strokeWidth={0.5} size={20}></BsBackspace>
        </button>
        {showTools && (
          <button
            title="Add"
            className="w-full h-10 flex justify-center cursor-pointer items-center duration-300 active:scale-90 ease-in-out hover:bg-secondary/70 rounded-full text-2xl"
            onClick={() => setSecondaryValue((prev) => prev + "+")}
          >
            <Plus></Plus>
          </button>
        )}
      </div>
      <button
        onClick={() => {
          setInput(value);
          setShowModal(false);
        }}
        title="1"
        className="p-3 w-full cursor-pointer active:scale-95 ease-in-out duration-300 rounded-full bg-primary text-surface font-semibold"
      >
        Set {text}
      </button>
    </div>
  );
};

export default DialPad;
