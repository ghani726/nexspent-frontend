import useAuth from "@/hooks/Auth";
import useData from "@/hooks/Data";

const Details = () => {
    const { user } = useAuth();

    const { accounts, categories, transactions, goals, budgets } = useData();
    return (
        <>
            <div className="flex animate-fade-in flex-col justify-center items-center w-full bg-white shadow-medium dark:bg-gray-800 p-4 rounded-5xl">
                <h2 className="text-3xl whitespace-break-spaces text-primary wrap-anywhere w-full text-center font-bold">
                    {user?.fullName}
                </h2>
                <h3 className="w-full text-center text-lg font-medium">
                    {user?.email}
                </h3>
                <h3 className="w-full text-center text-xl font-semibold text-gray-600">
                    @{user?.userName}
                </h3>
                <h3 className="w-full text-center text-gray-600">
                    Currency: {user?.currency}
                </h3>
                <h3 className="w-full text-center text-gray-600">
                    Decimal Precision: {user?.decimalPrecision}
                </h3>
            </div>
            <div className="flex flex-col justify-center items-center w-full bg-white shadow-medium dark:bg-gray-800 p-4 rounded-4xl gap-4">
                <h3 className="font-bold text-xl w-full text-start text-primary">
                    Info:
                </h3>
                <ul className="flex-col flex justify-start items-start w-full">
                    <li className="font-medium list-disc list-inside w-full text-start">
                        <strong> Total Transactions: </strong>{" "}
                        {transactions.length}
                    </li>
                    <li className="font-medium list-disc list-inside w-full text-start">
                        <strong>Total Accounts: </strong> {accounts.length}
                    </li>
                    <li className="font-medium list-disc list-inside w-full text-start">
                        <strong> Total Categories: </strong> {categories.length}
                    </li>
                    <li className="font-medium list-disc list-inside w-full text-start">
                        <strong> Total Goals: </strong> {goals.length}
                    </li>
                    <li className="font-medium list-disc list-inside w-full text-start">
                        <strong> Total Budgets: </strong> {budgets.length}
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Details;
