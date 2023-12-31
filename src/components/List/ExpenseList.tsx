import { useEffect, useState } from "react";
import ExpenseItem from "../Card/ExpenseItem";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ExpenseType, LoanType } from "../../Types";
import { useSelector } from "react-redux";
import { expenseSelector } from "../../Features/Expense/ExpenseSlice";
import { Reverse, getSortedByDate } from "../../utils";

interface Props {
    selected: string,
}

const ExpenseList = (prop: Props) => {

    const data = [
        {
            title: 'Food',
            amount: 100,
            type: 'Food',
            created_at: new Date('2021-09-01').toDateString(),
        },
        {
            title: 'Shopping',
            amount: 200,
            type: 'Shopping',
            created_at: new Date('2021-09-02').toDateString(),
        },
        {
            title: 'Groceries',
            amount: 300,
            type: 'Groceries',
            created_at: new Date('2021-09-03').toDateString(),
        },
        {
            title: 'Entertainment',
            amount: 400,
            type: 'Entertainment',
            created_at: new Date('2021-09-04').toDateString(),
        },
        {
            title: 'Travel',
            amount: 400,
            type: 'Travel',
            created_at: new Date('2021-09-04').toDateString(),
        },
        {
            title: 'Travel',
            amount: 400,
            type: 'Travel',
            created_at: new Date('2021-09-04').toDateString(),
        },
        {
            title: 'Travel',
            amount: 400,
            type: 'Travel',
            created_at: new Date('2021-09-04').toDateString(),
        },
    ]

    const exp = useSelector(expenseSelector)

    const [expenses, setExpenses] = useState(Reverse(exp))

    useEffect(() => {
        if(!exp) return

        const tem = Reverse(exp)

        if (prop.selected === 'All') {
            setExpenses(tem)
            // console.log('All', expenses.map(i => new Date(i.created_at).toDateString().split(' ')[2]))
        } else {
            setExpenses((tem.filter(i => i.type === prop.selected)))
        }
    }, [prop.selected, exp])

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 8,
                gap: 8,
                marginTop: 16,
                marginBottom: 120,
            }}
        >
            {
                expenses.map((item, index) => (
                    <ExpenseItem
                        key={index}
                        id={item.id}
                        title={item.title}
                        amount={item.amount}
                        type={item.type}
                        created_at={item.created_at}

                    />
                ))
            }
        </View>
    );
}

export default ExpenseList;