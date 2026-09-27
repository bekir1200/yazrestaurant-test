export type MenuItem = {
  name: string;
  description?: string;
  price: string;
  dietary?: string[];
};

export type MenuSection = {
  title: string;
  note?: string;
  items: MenuItem[];
};

// Transcribed from the restaurant's supplied main-menu PDF.
export const menuSections: MenuSection[] = [
  {
    title: "Cold starters",
    items: [
      { name: "Hummus", price: "£6.90", dietary: ["V", "VF", "GF"] },
      { name: "Cacik", price: "£6.90", dietary: ["V", "GF"] },
      { name: "Babaganoush", price: "£6.90", dietary: ["V", "GF", "VF"] },
      { name: "Tarama", price: "£6.90" },
      { name: "Mixed olives", price: "£5.50", dietary: ["V", "VF", "GF"] },
      { name: "Shakshuka", price: "£6.90", dietary: ["V", "VF", "GF"] },
      { name: "Cold Yaz selection", description: "An assortment of five cold starters selected by our chefs.", price: "£19.50" },
    ],
  },
  {
    title: "Hot starters",
    items: [
      { name: "Hot Yaz selection", description: "Halloumi, sujuk, falafel, calamari, borek pastry and boneless chicken wings.", price: "£20.90" },
      { name: "Soup of the day", price: "£7.90" },
      { name: "Padron peppers", description: "Pan-fried and seasoned with Maldon salt.", price: "£6.90", dietary: ["V", "VF", "GF"] },
      { name: "Hummus kavurma", description: "Topped with finely diced sujuk.", price: "£8.90", dietary: ["GF"] },
      { name: "Grilled halloumi", description: "Cypriot cheese.", price: "£8.00", dietary: ["V"] },
      { name: "Sujuk", description: "Grilled spicy beef sausage.", price: "£8.00" },
      { name: "Garlic bread", description: "Topped with melted mozzarella and seasoned with mixed herbs.", price: "£7.00" },
      { name: "Bang bang prawns", description: "Crispy tempura prawns served with Yaz-made spicy dynamite sauce.", price: "£10.90" },
      { name: "Chilli garlic king prawns", description: "Pan-sautéed with garlic and chilli, topped with parsley.", price: "£9.90" },
      { name: "Lamb tacos", description: "Seasoned pulled lamb served in tacos.", price: "£9.50" },
      { name: "Boneless chicken wings", description: "Glazed with a sweet chilli sauce.", price: "£8.90" },
      { name: "Crispy calamari", description: "Served with our special tartar sauce.", price: "£9.00" },
      { name: "Borek pastry", description: "Feta and parsley-filled panko pastry.", price: "£8.50", dietary: ["V"] },
      { name: "Falafel", description: "Broad beans, chickpeas and vegetable fritters served with hummus.", price: "£7.00", dietary: ["V", "VF", "GF"] },
      { name: "Creamy mushroom", description: "Pan-fried in Yaz-made sauce and topped with melted cheese.", price: "£8.90" },
      { name: "Meatballs", description: "Lamb and beef seasoned with fresh herbs and simmered in a rich tomato sauce.", price: "£7.90" },
    ],
  },
  {
    title: "Mains",
    note: "Chargrilled Yaz dishes are served on a slice of bread with pilav or bulgur and a salad garnish.",
    items: [
      { name: "Lamb shish", description: "Marinated pieces of best-cut neck lamb, cooked over hot charcoal.", price: "£26.90" },
      { name: "Mixed shish", description: "Choose two of chicken shish, lamb shish or Adana kofte, marinated and cooked over hot charcoal.", price: "£24.50" },
      { name: "Lamb ribs", description: "Specially marinated ribs, cooked over hot charcoal.", price: "£22.50" },
      { name: "Mixed grill", description: "Lamb shish, chicken shish, Adana kofte, chicken wings and a lamb chop, cooked over hot charcoal.", price: "£30.90" },
      { name: "Chicken shish", description: "Marinated chicken pieces cooked over hot charcoal.", price: "£20.00" },
      { name: "Adana kofte", description: "Hand-minced lamb with red peppers, onions, parsley and spices, cooked over hot charcoal.", price: "£19.50" },
      { name: "Lamb chops", description: "Four best-cut lamb chops cooked over hot charcoal.", price: "£27.50" },
      { name: "Grilled chicken wings", description: "Specially marinated wings cooked over hot charcoal.", price: "£18.00" },
      { name: "Wrap Beyti lamb", description: "Adana kofte in lavash, warmed over charcoal, buttered and served with spiced tomato sauce and garlic yoghurt.", price: "£21.90" },
      { name: "Lamb shank", description: "Tender lamb shank served with mashed potato and Yaz-made tomato sauce.", price: "£19.00" },
      { name: "Chicken à la crème", description: "Sautéed chicken with creamy sauce, Portobello mushrooms, shallots, garlic, herbs and Parmesan, served with rice.", price: "£20.50" },
      { name: "Kofte", description: "Grilled spiced kebab made with minced lamb and beef, served with herbs.", price: "£18.50" },
    ],
  },
  {
    title: "Fish",
    items: [
      { name: "Sea bass", description: "Pan-fried and served with seasonal vegetables.", price: "£21.50", dietary: ["GF"] },
      { name: "Salmon", description: "Pan-fried and served with seasonal vegetables.", price: "£21.50", dietary: ["GF"] },
    ],
  },
  {
    title: "Chef's favourites",
    items: [
      { name: "Yogurtlu kebab", description: "Choose lamb, chicken or Adana. Chopped shish over bread with tomato sauce and yoghurt, finished with butter.", price: "£26.00" },
      { name: "Casserole", description: "Diced chicken or lamb with onions, peppers, mushrooms and tomatoes, served with pilav rice.", price: "Chicken £18.90 · Lamb £21.90" },
      { name: "Çökertme", description: "Lamb or chicken over yoghurt, finished with crisp fried potato strips.", price: "Chicken £17.50 · Lamb £18.50" },
    ],
  },
  {
    title: "Pasta",
    items: [
      { name: "Penne arrabbiata", description: "Spicy tomato sauce with olives and the chef's special spices.", price: "£15.90", dietary: ["V"] },
      { name: "Chicken Alfredo", description: "Creamy white sauce with broccoli, mushroom and pesto.", price: "£17.90" },
      { name: "Prawn pasta", description: "Tagliatelle in a spicy, zesty tomato sauce with fresh vegetables.", price: "£19.90" },
    ],
  },
  {
    title: "Salads",
    items: [
      { name: "Feta salad", description: "Feta on tomato, cucumber, red onion and parsley.", price: "£7.90", dietary: ["V", "GF"] },
      { name: "Spicy ezme salad", description: "Finely chopped spicy salad with a sweet, tangy pomegranate-molasses kick.", price: "£7.90", dietary: ["V", "VF"] },
      { name: "Chicken Caesar salad", description: "Chargrilled chicken, Caesar dressing, mixed lettuce, croutons and Parmesan.", price: "£14.90" },
    ],
  },
  {
    title: "Burgers",
    note: "All burgers are served with fries.",
    items: [
      { name: "Cheese burger", description: "Prime beef patty, cheese, mixed lettuce, tomatoes, caramelised onions, pickled gherkins and Yaz-made burger sauce.", price: "£17.00" },
      { name: "Chicken burger", description: "Grilled chicken breast, mixed lettuce, tomatoes, pickled gherkins, caramelised onions and Yaz-made burger sauce.", price: "£17.50" },
      { name: "Vegan burger", description: "Yaz-made vegan patty with mixed lettuce, tomatoes, pickled gherkins, caramelised onions, smashed avocado and vegan mayonnaise.", price: "£15.50", dietary: ["V", "VF"] },
    ],
  },
  {
    title: "Steaks",
    note: "Choose peppercorn or creamy mushroom sauce. Served with asparagus, tenderstem broccoli and mash or fries.",
    items: [
      { name: "Argentinian rib-eye, 300g", description: "29-day dry-aged beef, cooked to your preference.", price: "£34.00" },
      { name: "Argentinian sirloin, 300g", description: "29-day dry-aged beef, cooked to your preference.", price: "£30.00" },
    ],
  },
  {
    title: "Vegetarian",
    items: [
      { name: "Vegan grill", description: "Chargrilled seasonal vegetables served with salad.", price: "£15.90", dietary: ["V", "VF", "GF"] },
      { name: "Falafel & halloumi salad", description: "Freshly prepared, light and full of vibrant flavours.", price: "£15.90", dietary: ["V"] },
      { name: "Stuffed aubergine", description: "Oven-baked aubergine with vegetables and halloumi, topped with mozzarella and Yaz-made tomato sauce; served with rice and salad.", price: "£15.90", dietary: ["V"] },
      { name: "Vegetarian moussaka", description: "Potato, aubergine, courgettes, peppers, carrots, green lentils and feta, topped with béchamel and served with Yaz-made tomato sauce, rice and salad.", price: "£16.90", dietary: ["V"] },
    ],
  },
  {
    title: "Yaz platters",
    items: [
      { name: "Platter for four", description: "A selection of signature grilled meats to share, with complementary meze, rice, bulgur and salad.", price: "£99.90" },
      { name: "Platter for six", description: "A selection of signature grilled meats to share, with complementary meze, rice, bulgur and salad.", price: "£129.90" },
    ],
  },
  {
    title: "Sides",
    items: [
      { name: "Pilav rice", price: "£3.90", dietary: ["V"] },
      { name: "Bulgur rice", price: "£3.90", dietary: ["V"] },
      { name: "Steak-cut chips", price: "£4.50", dietary: ["V", "VF"] },
      { name: "French fries", price: "£3.90", dietary: ["V", "VF"] },
      { name: "Mac & cheese", price: "£6.50", dietary: ["V"] },
      { name: "Grilled asparagus", price: "£6.00", dietary: ["V", "VF", "GF"] },
      { name: "Mashed potato", price: "£4.50", dietary: ["V"] },
      { name: "Mixed seasonal vegetables", price: "£6.90", dietary: ["V"] },
    ],
  },
];

export const menuDietaryNote = "V Vegetarian · VF Vegan friendly · GF Gluten free. Please tell a member of the team about any allergies or dietary requirements. A discretionary 10% will be added to your bill.";
