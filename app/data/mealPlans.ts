const mealPlans2 = [
  {
    id: 1,
    name: "Weight Loss Plan",
    description: "A balanced meal plan designed for weight loss with a calorie deficit.",
    calories: 1800,
    protein: 150,
    carbs: 150,
    fat: 60,
    meals: [
      {
        id: 1,
        name: "Breakfast",
        time: "7:00 AM",
        foods: [
          { name: "Greek Yogurt", amount: "1 cup", calories: 150, protein: 20, carbs: 8, fat: 4 },
          { name: "Blueberries", amount: "1/2 cup", calories: 40, protein: 0, carbs: 10, fat: 0 },
          { name: "Granola", amount: "1/4 cup", calories: 120, protein: 3, carbs: 20, fat: 3 },
        ],
      },
      {
        id: 2,
        name: "Lunch",
        time: "12:00 PM",
        foods: [
          { name: "Grilled Chicken Breast", amount: "4 oz", calories: 180, protein: 35, carbs: 0, fat: 4 },
          { name: "Brown Rice", amount: "1/2 cup", calories: 110, protein: 2, carbs: 22, fat: 1 },
          { name: "Steamed Broccoli", amount: "1 cup", calories: 55, protein: 4, carbs: 11, fat: 0 },
        ],
      },
      {
        id: 3,
        name: "Snack",
        time: "3:00 PM",
        foods: [
          { name: "Apple", amount: "1 medium", calories: 95, protein: 0, carbs: 25, fat: 0 },
          { name: "Almonds", amount: "1 oz", calories: 160, protein: 6, carbs: 6, fat: 14 },
        ],
      },
      {
        id: 4,
        name: "Dinner",
        time: "6:30 PM",
        foods: [
          { name: "Salmon", amount: "4 oz", calories: 200, protein: 22, carbs: 0, fat: 12 },
          { name: "Quinoa", amount: "1/2 cup", calories: 110, protein: 4, carbs: 20, fat: 2 },
          { name: "Roasted Vegetables", amount: "1 cup", calories: 80, protein: 2, carbs: 16, fat: 1 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Muscle Building Plan",
    description: "High protein meal plan designed for muscle growth and recovery.",
    calories: 2800,
    protein: 220,
    carbs: 280,
    fat: 90,
    meals: [
      {
        id: 1,
        name: "Breakfast",
        time: "7:00 AM",
        foods: [
          { name: "Eggs", amount: "4 whole", calories: 280, protein: 24, carbs: 0, fat: 20 },
          { name: "Oatmeal", amount: "1 cup", calories: 150, protein: 5, carbs: 27, fat: 2 },
          { name: "Banana", amount: "1 medium", calories: 105, protein: 1, carbs: 27, fat: 0 },
        ],
      },
      {
        id: 2,
        name: "Mid-Morning Snack",
        time: "10:00 AM",
        foods: [
          { name: "Protein Shake", amount: "1 scoop", calories: 120, protein: 25, carbs: 3, fat: 1 },
          { name: "Peanut Butter", amount: "1 tbsp", calories: 95, protein: 4, carbs: 3, fat: 8 },
        ],
      },
      {
        id: 3,
        name: "Lunch",
        time: "1:00 PM",
        foods: [
          { name: "Chicken Breast", amount: "6 oz", calories: 270, protein: 50, carbs: 0, fat: 6 },
          { name: "Sweet Potato", amount: "1 medium", calories: 115, protein: 2, carbs: 27, fat: 0 },
          { name: "Broccoli", amount: "1 cup", calories: 55, protein: 4, carbs: 11, fat: 0 },
        ],
      },
      {
        id: 4,
        name: "Afternoon Snack",
        time: "4:00 PM",
        foods: [
          { name: "Greek Yogurt", amount: "1 cup", calories: 150, protein: 20, carbs: 8, fat: 4 },
          { name: "Berries", amount: "1/2 cup", calories: 40, protein: 0, carbs: 10, fat: 0 },
          { name: "Honey", amount: "1 tbsp", calories: 60, protein: 0, carbs: 17, fat: 0 },
        ],
      },
      {
        id: 5,
        name: "Dinner",
        time: "7:00 PM",
        foods: [
          { name: "Steak", amount: "6 oz", calories: 350, protein: 42, carbs: 0, fat: 20 },
          { name: "Brown Rice", amount: "1 cup", calories: 220, protein: 4, carbs: 44, fat: 2 },
          { name: "Mixed Vegetables", amount: "1 cup", calories: 80, protein: 2, carbs: 16, fat: 1 },
        ],
      },
      {
        id: 6,
        name: "Before Bed",
        time: "9:30 PM",
        foods: [
          { name: "Casein Protein", amount: "1 scoop", calories: 120, protein: 25, carbs: 3, fat: 1 },
          { name: "Almond Milk", amount: "1 cup", calories: 30, protein: 1, carbs: 1, fat: 2 },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Balanced Maintenance Plan",
    description: "A well-rounded plan for maintaining current weight and supporting daily energy needs.",
    calories: 2200,
    protein: 160,
    carbs: 220,
    fat: 70,
    meals: [
      {
        id: 1,
        name: "Breakfast",
        time: "7:30 AM",
        foods: [
          { name: "Scrambled Eggs", amount: "2 eggs", calories: 180, protein: 12, carbs: 2, fat: 14 },
          { name: "Whole Wheat Toast", amount: "2 slices", calories: 160, protein: 6, carbs: 28, fat: 2 },
          { name: "Orange", amount: "1 medium", calories: 60, protein: 1, carbs: 15, fat: 0 },
        ],
      },
      {
        id: 2,
        name: "Lunch",
        time: "12:30 PM",
        foods: [
          { name: "Turkey Sandwich", amount: "1 sandwich", calories: 400, protein: 30, carbs: 35, fat: 12 },
          { name: "Carrot Sticks", amount: "1 cup", calories: 50, protein: 1, carbs: 12, fat: 0 },
          { name: "Hummus", amount: "2 tbsp", calories: 70, protein: 2, carbs: 4, fat: 6 },
        ],
      },
      {
        id: 3,
        name: "Snack",
        time: "3:30 PM",
        foods: [
          { name: "Trail Mix", amount: "1/4 cup", calories: 200, protein: 6, carbs: 16, fat: 14 },
          { name: "Apple", amount: "1 medium", calories: 95, protein: 0, carbs: 25, fat: 0 },
        ],
      },
      {
        id: 4,
        name: "Dinner",
        time: "6:30 PM",
        foods: [
          { name: "Grilled Chicken Thigh", amount: "5 oz", calories: 250, protein: 30, carbs: 0, fat: 15 },
          { name: "Mashed Potatoes", amount: "1 cup", calories: 200, protein: 4, carbs: 35, fat: 7 },
          { name: "Green Beans", amount: "1 cup", calories: 40, protein: 2, carbs: 8, fat: 0 },
        ],
      },
    ],
  },
];

export default mealPlans2;
