const fakeRecipesData = {
    results: [
      {
        id: 1,
        title: "Spaghetti Carbonara",
        image: "https://www.example.com/images/spaghetti-carbonara.jpg",
        description: "Classic Italian pasta dish with eggs, cheese, and pancetta.",
      },
      {
        id: 2,
        title: "Vegetable Stir-Fry",
        image: "https://www.example.com/images/vegetable-stir-fry.jpg",
        description: "Healthy stir-fried vegetables in a savory sauce.",
      },
      {
        id: 3,
        title: "Chicken Alfredo",
        image: "https://www.example.com/images/chicken-alfredo.jpg",
        description: "Creamy pasta with grilled chicken and parmesan cheese.",
      },
      {
        id: 4,
        title: "Mushroom Risotto",
        image: "https://www.example.com/images/mushroom-risotto.jpg",
        description: "Rich and flavorful Italian rice dish with mushrooms and cheese.",
      },
      {
        id: 5,
        title: "Tacos",
        image: "https://www.example.com/images/tacos.jpg",
        description: "Mexican street-style tacos with various fillings and salsa.",
      },
      {
        id: 6,
        title: "Salmon Teriyaki",
        image: "https://www.example.com/images/salmon-teriyaki.jpg",
        description: "Grilled salmon glazed with a sweet and savory teriyaki sauce.",
      },
      {
        id: 7,
        title: "Caprese Salad",
        image: "https://www.example.com/images/caprese-salad.jpg",
        description: "Fresh Italian salad with tomatoes, mozzarella, basil, and balsamic glaze.",
      },
      {
        id: 8,
        title: "Beef Stroganoff",
        image: "https://www.example.com/images/beef-stroganoff.jpg",
        description: "Tender beef in a creamy mushroom sauce served over noodles.",
      },
      {
        id: 9,
        title: "Pesto Pasta",
        image: "https://www.example.com/images/pesto-pasta.jpg",
        description: "Pasta coated in a vibrant basil pesto sauce.",
      },
      {
        id: 10,
        title: "Grilled Vegetable Skewers",
        image: "https://www.example.com/images/grilled-vegetable-skewers.jpg",
        description: "Assorted vegetables grilled to perfection on skewers.",
      },
    ],
  };
  


const fakeIngredientsData = [
    [
        {
            "name": "cannellini beans",
            "amount": 3.75
        },
        {
            "name": "curry leaves",
            "amount": 1
        },
        {
            "name": "tarragon",
            "amount": 0.25
        },
        {
            "name": "garlic",
            "amount": 1
        },
        {
            "name": "juice of lemon",
            "amount": 3
        },
        {
            "name": "lemon zest",
            "amount": 1
        },
        {
            "name": "olive oil",
            "amount": 0.5
        },
        {
            "name": "olive oil",
            "amount": 2
        },
        {
            "name": "cracked pepper",
            "amount": 6
        },
        {
            "name": "sea salt",
            "amount": 1
        },
        {
            "name": "mushrooms",
            "amount": 8
        },
        {
            "name": "mushrooms",
            "amount": 8
        },
        {
            "name": "grain mustard",
            "amount": 1
        }
    ],
    [
        {
            "name": "broccoli",
            "amount": 2
        },
        {
            "name": "cauliflower",
            "amount": 1
        },
        {
            "name": "t coconut oil",
            "amount": 1
        },
        {
            "name": "brown rice",
            "amount": 3
        },
        {
            "name": "garlic",
            "amount": 5
        },
        {
            "name": "t grapeseed oil",
            "amount": 1
        },
        {
            "name": "soy sauce",
            "amount": 3
        },
        {
            "name": "peas",
            "amount": 1
        },
        {
            "name": "salt",
            "amount": 8
        },
        {
            "name": "additional scallion tops",
            "amount": 8
        },
        {
            "name": "scallions",
            "amount": 7
        },
        {
            "name": "sesame oil",
            "amount": 2
        },
        {
            "name": "sesame seeds",
            "amount": 8
        }
    ],
    [
        {
            "name": "banana",
            "amount": 0.25
        },
        {
            "name": "graham cracker crumbs",
            "amount": 2
        },
        {
            "name": "soy milk",
            "amount": 1
        },
        {
            "name": "strawberries",
            "amount": 0.5
        },
        {
            "name": "vanilla yogurt",
            "amount": 1
        }
    ],
    [
        {
            "name": "additional toppings: avocado",
            "amount": 8
        },
        {
            "name": "carrots",
            "amount": 3
        },
        {
            "name": "celery stalks",
            "amount": 3
        },
        {
            "name": "chicken breast",
            "amount": 2
        },
        {
            "name": "flat leaf parsley",
            "amount": 0.5
        },
        {
            "name": "garlic",
            "amount": 6
        },
        {
            "name": "olive oil",
            "amount": 2
        },
        {
            "name": "canned tomatoes",
            "amount": 28
        },
        {
            "name": "lentils",
            "amount": 2
        },
        {
            "name": "salt and pepper",
            "amount": 8
        },
        {
            "name": "turnip",
            "amount": 1
        },
        {
            "name": "vegetable stock",
            "amount": 8
        },
        {
            "name": "onion",
            "amount": 1
        }
    ],
    [
        {
            "name": "asparagus",
            "amount": 1
        },
        {
            "name": "evoo",
            "amount": 1
        },
        {
            "name": "garlic",
            "amount": 2
        },
        {
            "name": "onion",
            "amount": 0.5
        },
        {
            "name": "peas",
            "amount": 2
        },
        {
            "name": "vegetable broth",
            "amount": 1
        }
    ],
    [
        {
            "name": "balsamic vinegar",
            "amount": 3
        },
        {
            "name": "garlic",
            "amount": 1
        },
        {
            "name": "curly kale",
            "amount": 1
        },
        {
            "name": "olive oil",
            "amount": 2
        }
    ],
    [
        {
            "name": "beef broth",
            "amount": 14.5
        },
        {
            "name": "carrots",
            "amount": 2
        },
        {
            "name": "celery",
            "amount": 2
        },
        {
            "name": "cream of mushroom soup",
            "amount": 26
        },
        {
            "name": "green onions",
            "amount": 3
        },
        {
            "name": "new potatoes",
            "amount": 10
        },
        {
            "name": "onion",
            "amount": 1
        },
        {
            "name": "dale's seasoning",
            "amount": 0.5
        },
        {
            "name": "stew meat",
            "amount": 2
        },
        {
            "name": "water",
            "amount": 2
        }
    ],
    [
        {
            "name": "brown rice",
            "amount": 2
        },
        {
            "name": "carrots",
            "amount": 2
        },
        {
            "name": "celery",
            "amount": 2
        },
        {
            "name": "celery seed",
            "amount": 1
        },
        {
            "name": "kidney beans",
            "amount": 2
        },
        {
            "name": "marjoram",
            "amount": 1
        },
        {
            "name": "thyme",
            "amount": 2
        },
        {
            "name": "eggplant",
            "amount": 1
        },
        {
            "name": "garlic",
            "amount": 2
        },
        {
            "name": "green beans",
            "amount": 3
        },
        {
            "name": "ground pepper",
            "amount": 6
        },
        {
            "name": "ground sage",
            "amount": 2
        },
        {
            "name": "liquid smoke",
            "amount": 0.5
        },
        {
            "name": "olive oil",
            "amount": 2
        },
        {
            "name": "bell pepper",
            "amount": 1
        },
        {
            "name": "onion",
            "amount": 1
        },
        {
            "name": "sea salt",
            "amount": 1.5
        },
        {
            "name": "sriracha",
            "amount": 1
        },
        {
            "name": "tomatoes",
            "amount": 2
        },
        {
            "name": "vegetable stock",
            "amount": 3
        }
    ],
    [
        {
            "name": "avocado",
            "amount": 1
        },
        {
            "name": "bell peppers",
            "amount": 2
        },
        {
            "name": "bell peppers",
            "amount": 2
        },
        {
            "name": "grilled chicken breasts",
            "amount": 2
        },
        {
            "name": "chili powder",
            "amount": 0.25
        },
        {
            "name": "cilantro",
            "amount": 2
        },
        {
            "name": "cumin",
            "amount": 0.25
        },
        {
            "name": "lettuce",
            "amount": 3
        },
        {
            "name": "already quinoa",
            "amount": 1
        },
        {
            "name": "salsa",
            "amount": 3
        },
        {
            "name": "salt and pepper",
            "amount": 3
        },
        {
            "name": "cheese",
            "amount": 1
        }
    ],
    [
        {
            "name": "chickpeas",
            "amount": 3
        },
        {
            "name": "garlic",
            "amount": 2
        },
        {
            "name": "juice of lemon",
            "amount": 3
        },
        {
            "name": "olive oil",
            "amount": 2
        },
        {
            "name": "paprika",
            "amount": 4
        },
        {
            "name": "pine nuts",
            "amount": 2
        },
        {
            "name": "sea salt",
            "amount": 1.5
        },
        {
            "name": "tahini",
            "amount": 0.33333334
        },
        {
            "name": "za'atar",
            "amount": 2
        }
    ]
]

exports.fakeRecipesData = fakeRecipesData;
exports.fakeIngredientsData = fakeIngredientsData;