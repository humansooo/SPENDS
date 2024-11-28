import { v4 } from "uuid";

import { ExpenseType } from "../types";

export const addExpense = (ref: {
  addCat;
  addEx;
  data: {
    title: string;
    amount: number;
  };
}) => {
  const { addCat, addEx, data } = ref;

  const refData = [
    {
      type: "Food",
      names: [
        "Food",
        "Groceries",
        "Restaurant",
        "paneer",
        "samosa",
        "pizza",
        "burger",
        "dosa",
        "idli",
        "rice",
        "dal",
        "chicken",
        "mutton",
        "fish",
        "egg",
        "milk",
        "tea",
        "coffee",
        "biscuit",
        "bread",
        "butter",
        "cheese",
        "oil",
        "ghee",
        "sugar",
        "salt",
        "masala",
        "chocolate",
        "ice cream",
        "cake",
        "pastry",
        "sweets",
        "snacks",
        "juice",
        "cold drink",
        "water",
        "fruits",
        "vegetables",
        "dry fruits",
        "ice",
        "water bottle",
      ],
    },
    {
      type: "Health",
      names: [
        "Health",
        "Medicine",
        "Doctor",
        "Hospital",
        "Medical",
        "Gym",
        "Yoga",
        "Dance",
        "Exercise",
        "Fitness",
        "meds",
        "med",
      ],
    },
    {
      type: "Education",
      names: [
        "Book",
        "Pen",
        "Pencil",
        "Notebook",
        "Bag",
        "Tuition",
        "Coaching",
        "Education",
        "School",
        "College",
        "Books",
        "Pen",
        "Pencil",
      ],
    },
    {
      type: "Transport",
      names: [
        "Transport",
        "Bus",
        "Train",
        "Flight",
        "Taxi",
        "Auto",
        "Metro",
        "Cab",
        "Car",
        "Bike",
        "Scooter",
        "Petrol",
        "Diesel",
        "CNG",
        "LPG",
        "Parking",
        "Toll",
        "Bus",
        "Train",
        "Flight",
        "Taxi",
        "Auto",
        "Metro",
        "Toll",
      ],
    },
    {
      type: "Shopping",
      names: [
        "Shopping",
        "Clothes",
        "Shoes",
        "Jewellery",
        "Watch",
        "Goggles",
        "Wallet",
        "Belt",
        "Bag",
        "Suitcase",
        "Gift",
        "Furniture",
        "Grocery",
        "Electronics",
        "Mobile",
        "Laptop",
        "Computer",
        "TV",
        "Refrigerator",
        "Washing Machine",
        "AC",
        "Fan",
        "Cooler",
        "Microwave",
        "Oven",
        "Toaster",
        "Grinder",
        "Juicer",
        "Mixer",
        "Iron",
        "Vacuum Cleaner",
        "Water Purifier",
        "Camera",
        "Printer",
        "Scanner",
        "Speaker",
        "Headphone",
        "Earphone",
        "Charger",
        "Power Bank",
        "Pen Drive",
        "Hard Disk",
        "Keyboard",
        "Mouse",
        "Pendrive",
        "Hard Disk",
        "Memory Card",
        "Router",
        "Modem",
        "Keyboard",
        "Mouse",
      ],
    },
    {
      type: "Entertainment",
      names: [
        "Entertainment",
        "Movie",
        "Theatre",
        "Concert",
        "Party",
        "Event",
        "Game",
        "Cricket",
        "Football",
        "Hockey",
        "Badminton",
        "Tennis",
        "Gym",
        "Swimming",
        "Yoga",
        "Dance",
        "Music",
        "Singing",
        "Painting",
        "Drawing",
        "Sketching",
        "Photography",
        "Reading",
        "Writing",
        "Cooking",
        "Baking",
        "Gardening",
        "Fishing",
        "Hunting",
        "Camping",
        "Hiking",
        "Travelling",
        "Trekking",
        "Cycling",
        "Running",
        "Walking",
        "Movie",
        "Theatre",
        "Concert",
        "Party",
        "Event",
        "Game",
        "Cricket",
        "Football",
        "Hockey",
        "Badminton",
        "Tennis",
        "Gym",
        "Swimming",
        "Yoga",
        "Dance",
        "Music",
        "Running",
        "Walking",
      ],
    },
  ];

  let type = "Other";

  const filter = (d: any, t: string) =>
    d.forEach((item: any) => {
      for (let i = 0; i < item.names.length; i++) {
        console.log(item.names[i]);
        if (t.toLowerCase() === item.names[i].toLowerCase()) {
          type = item.type;
          break;
        }
      }
    });

  const words = data.title.split(" ");

  for (let i = 0; i < words.length; i++) {
    filter(refData, words[i]);
  }

  const expense: any = {
    title: data.title,
    amount: data.amount,
    type,
    created_at: new Date().toISOString(),
  };

  // console.log(expense);

  addCat(type);

  addEx(expense);

  return {
    status: "success",
  };
};

export const deleteExpense = (ref: {
  remove;
  data: {
    id: number;
  };
}) => {
  const { remove, data } = ref;

  remove(data.id);

  return {
    status: "success",
    id: data.id,
  };
};
