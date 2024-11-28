import { FlashList } from '@shopify/flash-list'
import { useEffect, useState } from 'react'

import { useStore } from '../../store/Store'
import { Reverse, getSortedByDate } from '../../utils'
import ExpenseItem from '../Card/ExpenseItem'
import { HomeCarousel } from '../Carousel'

const ExpenseList = () => {
  const exp = useStore((state) => state.expense)
  const cat = useStore((state) => state.category)
  const [selected, setSelected] = useState('All')

  const [expenses, setExpenses] = useState(Reverse(exp))

  useEffect(() => {
    if (!exp) return

    const tem = Reverse(exp)

    if (selected === 'All') {
      setExpenses(tem)
    } else {
      setExpenses(tem.filter((i) => i.type === selected))
    }
  }, [selected, exp])

  return (
    <FlashList
      data={expenses}
      estimatedItemSize={500}
      ListHeaderComponent={() => (
        <HomeCarousel
          data={cat}
          selected={selected}
          onChange={(e) => setSelected(e)}
        />
      )}
      renderItem={({ item }) => (
        <ExpenseItem
          key={item.id}
          id={item.id}
          title={item.title}
          amount={item.amount}
          type={item.type}
          created_at={item.created_at}
        />
      )}
      horizontal={false}
      contentContainerStyle={{
        paddingTop: 300,
        paddingHorizontal: 8,
        paddingBottom: 100,
      }}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default ExpenseList
