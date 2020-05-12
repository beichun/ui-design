from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

app.config['TEMPLATES_AUTO_RELOAD'] = True

homepage_images = [
    {
        "name": "Hairy Navel",
        "imagelink": "https://www.thespruceeats.com/thmb/6mQlLbN3paEuRfSDSDJ4FCLiqwM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cocktail-with-orange-juice-on-grey-background-640045126-bf2b4d508cb84f2e8eb69ef265573667.jpg"
    },
    {
        "name": "Hairy Navel",
        "imagelink": "https://www.thespruceeats.com/thmb/6mQlLbN3paEuRfSDSDJ4FCLiqwM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cocktail-with-orange-juice-on-grey-background-640045126-bf2b4d508cb84f2e8eb69ef265573667.jpg"
    },
    {
        "name": "Hairy Navel",
        "imagelink": "https://www.thespruceeats.com/thmb/6mQlLbN3paEuRfSDSDJ4FCLiqwM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cocktail-with-orange-juice-on-grey-background-640045126-bf2b4d508cb84f2e8eb69ef265573667.jpg"
    },
    {
        "name": "Hairy Navel",
        "imagelink": "https://www.thespruceeats.com/thmb/6mQlLbN3paEuRfSDSDJ4FCLiqwM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cocktail-with-orange-juice-on-grey-background-640045126-bf2b4d508cb84f2e8eb69ef265573667.jpg"
    },
    {
        "name": "Hairy Navel",
        "imagelink": "https://www.thespruceeats.com/thmb/6mQlLbN3paEuRfSDSDJ4FCLiqwM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cocktail-with-orange-juice-on-grey-background-640045126-bf2b4d508cb84f2e8eb69ef265573667.jpg"
    }
]

recipe_data = [
    {
        "title": "Screwdriver",
        "description": "The screwdriver cocktail is a drink that deserves to be enjoyed ice cold and with fresh ingredients. The strong taste of the orange juice and the sharp vodka taste mix well and make it a drink you will never get tired of.",
        "img": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shutterstock-1090761986-sm-1539891205.jpg",
        "video": "https://www.youtube.com/embed/ckcV0K8Oc_Y?start=25",
        "items": [
            "A glass",
            "1 ½ oz. / 50ml Vodka",
            "4 ½ oz. / 150ml Fresh Orange Juice",
            "Ice",
            "(optional) Orange Slice Garnish"
        ],
        "steps": [
            "Fill glass with ice",
            "Pour 4 ½ oz. orange juice",
            "Add your choice of Vodka",
            "(optional) Cut a small slice of fresh orange, make a straight cut from the edge to the center, and put on glass",
            "Ready to serve!"
        ]
    },
    {
        "title": "Hairy Navel",
        "description": "The Hairy Navel is the drink you're looking for if you want a fuzzy navel with vodka. It has the same wonderful flavor combination of orange and peach, it's just a little stronger.",
        "img": "https://www.thespruceeats.com/thmb/6mQlLbN3paEuRfSDSDJ4FCLiqwM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cocktail-with-orange-juice-on-grey-background-640045126-bf2b4d508cb84f2e8eb69ef265573667.jpg",
        "video": "https://www.youtube.com/embed/aHYh5qZLAmQ?start=5",
        "items": [
            "A glass",
            "1 ounce vodka",
            "1 ounce peach schnapps",
            "Orange juice (to fill the glass)",
            "Ice"
        ],
        "steps": [
            "Fill glass with ice",
            "Pour 1 oz Vodka",
            "Pour 1 oz peach schnapps",
            "Fill with orange juice",
            "(optional) garnish with an orange slice",
            "Ready to serve!"
        ]
    },
    {
        "title": "Sex on the Beach",
        "description": "The Hairy Navel is the drink you're looking for if you want a fuzzy navel with vodka. It has the same wonderful flavor combination of orange and peach, it's just a little stronger.",
        "img": "https://www.thespruceeats.com/thmb/Z3C-kthEuuhPOSID5IiREuM_168=/4563x2567/smart/filters:no_upscale()/sex-on-the-beach-cocktail-recipe-759828-Hero-5b699b04c9e77c0025ecf52c.jpg",
        "video": "https://www.youtube.com/embed/ckcV0K8Oc_Y?start=25",
        "items": [
            "A glass",
            "1 ounce vodka",
            "1 ounce peach schnapps",
            "Orange juice (to fill the glass)",
            "Ice"
        ],
        "steps": [
            "Fill glass with ice",
            "Pour 1 oz Vodka",
            "Pour 1 oz peach schnapps",
            "Fill with orange juice",
            "(optional) garnish with an orange slice",
            "Ready to serve!"
        ]
    },
    {
        "title": "Moscow Mule",
        "description": "The Hairy Navel is the drink you're looking for if you want a fuzzy navel with vodka. It has the same wonderful flavor combination of orange and peach, it's just a little stronger.",
        "img": "https://media2.s-nbcnews.com/i/newscms/2016_19/1082361/mango-moscow-mule-today-20160510-tease_c9a61ef16664a589a98fc4e8a55e2d08.jpg",
        "video": "https://www.youtube.com/embed/ckcV0K8Oc_Y?start=25",
        "items": [
            "A glass",
            "1 ounce vodka",
            "1 ounce peach schnapps",
            "Orange juice (to fill the glass)",
            "Ice"
        ],
        "steps": [
            "Fill glass with ice",
            "Pour 1 oz Vodka",
            "Pour 1 oz peach schnapps",
            "Fill with orange juice",
            "(optional) garnish with an orange slice",
            "Ready to serve!"
        ]
    },
    {
        "title": "Cuba Libre",
        "description": "The Hairy Navel is the drink you're looking for if you want a fuzzy navel with vodka. It has the same wonderful flavor combination of orange and peach, it's just a little stronger.",
        "img": "https://assets.punchdrink.com/wp-content/uploads/2014/07/Cuba-Libre.jpg",
        "video": "https://www.youtube.com/embed/ckcV0K8Oc_Y?start=25",
        "items": [
            "A glass",
            "1 ounce vodka",
            "1 ounce peach schnapps",
            "Orange juice (to fill the glass)",
            "Ice"
        ],
        "steps": [
            "Fill glass with ice",
            "Pour 1 oz Vodka",
            "Pour 1 oz peach schnapps",
            "Fill with orange juice",
            "(optional) garnish with an orange slice",
            "Ready to serve!"
        ]
    }
]

quiz_answer = [
    {
        "name": "Hairy Navel",
        "steps": ["vodka", "peach schnapps", "orange juice"]
    }
]

learning_status = {
    "basics": [
        {
            "title": "Ingredients",
            "img": "https://www.thespiritsbusiness.com/content/http://www.thespiritsbusiness.com/media/2019/08/Diageo-India-brands.jpg",
            "learned": False,
            "intro": "Spirits, juices."
        },
        {
            "title": "Tools",
            "img": "https://i.ebayimg.com/images/g/byQAAOSwXLldbihT/s-l300.jpg",
            "learned": False,
            "intro": "Drink containers, jigger, spoon."
        }
    ],
    "recipes": [
        {
            "title": "Screwdriver",
            "img": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shutterstock-1090761986-sm-1539891205.jpg",
            "learned": False,
            "intro": "intro1"
        },
        {
            "title": "Hairy Navel",
            "img": "https://www.thespruceeats.com/thmb/6mQlLbN3paEuRfSDSDJ4FCLiqwM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cocktail-with-orange-juice-on-grey-background-640045126-bf2b4d508cb84f2e8eb69ef265573667.jpg",
            "learned": False,
            "intro": "intro2"
        },
        {
            "title": "Sex on the Beach",
            "img": "https://www.thespruceeats.com/thmb/Z3C-kthEuuhPOSID5IiREuM_168=/4563x2567/smart/filters:no_upscale()/sex-on-the-beach-cocktail-recipe-759828-Hero-5b699b04c9e77c0025ecf52c.jpg",
            "learned": False,
            "intro": "intro3"
        },
        {
            "title": "Moscow Mule",
            "img": "https://media2.s-nbcnews.com/i/newscms/2016_19/1082361/mango-moscow-mule-today-20160510-tease_c9a61ef16664a589a98fc4e8a55e2d08.jpg",
            "learned": False,
            "intro": "intro4"
        },
        {
            "title": "Cuba Libre",
            "img": "https://assets.punchdrink.com/wp-content/uploads/2014/07/Cuba-Libre.jpg",
            "learned": False,
            "intro": "intro5"
        }
    ],    
    "quizes": [
        {
            "title": "Drag and drop: Screwdriver",
            "learned": False,
            "correct": None
        },
        {
            "title": "Drag and drop: Hairy Navel",
            "learned": False,
            "correct": None
        },
        {
            "title": "Drag and drop: Sex on the Beach",
            "learned": False,
            "correct": None
        },
        {
            "title": "Drag and drop: Moscow Mule",
            "learned": False,
            "correct": None
        },
        {
            "title": "Drag and drop: Cuba Libre",
            "learned": False,
            "correct": None
        }
    ]
}

images = {
    "vodka": "https://cdn.shopify.com/s/files/1/0013/2477/7569/products/absorg_1000x.jpg?v=1542752999"
}

basic_material0 = {
    "spirits": [
        {
            "title": "Vodka",
            "img": "https://cdn.shopify.com/s/files/1/0013/2477/7569/products/absorg_1000x.jpg?v=1542752999"
        },
        {
            "title": "Peach Schnapps",
            "img": "https://dydza6t6xitx6.cloudfront.net/ci-mr-boston-peach-brandy-3c05ca0e5ed7e5ee.jpeg"
        },
        {
            "title": "Ginger Beer",
            "img": "https://www.behindthebar.com/media/catalog/product/c/p/cp500129_fever-tree-premium-ginger-beer-6.8-oz_01.jpg"
        }
    ],
    "juices": [
        {
            "title": "Cranberry juice",
            "img": "https://images-na.ssl-images-amazon.com/images/I/51CgMNErx9L._SL1000_.jpg"
        },
        {
            "title": "Orange juice",
            "img": "https://cdn11.bigcommerce.com/s-bh9y1guk/images/stencil/2048x2048/products/369/539/Tropicana-Orange-Juice__38340.1528291909.jpg?c=2&imbypass=on"
        }
    ]
}

basic_material1 = {
    "containers": [
        {
            "title": "Collins Glass",
            "summary": "A tall and skinny glass.",
            "img": "https://assets.katomcdn.com/q_auto,f_auto/products/634/634-126/634-126.jpg"
        },
        {
            "title": "High ball glass",
            "summary": "The most common glass at bars.",
            "img": "https://www.ikea.com/us/en/images/products/pokal-glass-clear-glass__0713251_PE729361_S5.JPG"
        },
        {
            "title": "Copper Mug",
            "summary": "The best for Moscow Mule.",
            "img": "https://www.surlatable.com/dw/image/v2/BCJL_PRD/on/demandware.static/-/Sites-shop-slt-master-catalog/default/dwe7729f1e/images/large/3447356_01i_0717_s.jpg?sw=688&sh=680&sm=fit"
        }
    ],
    "jigger": {
        "title": "Jigger",
        "summary": "A Jigger is a small tool that is used to measure the proper amount of alcohol that should be added to a cocktail. Jiggers can be made of metal, plastic, or glass, and come in all kinds of shapes and sizes.",
        "img": "https://assets.urbanbar.com/wp-content/uploads/2013/01/UB3758.jpg"
        },
    "spoon": {
        "title": "Spoon",
        "summary": "A bar spoon holds about 5 millilitres of liquid (the same as a conventional teaspoon) or 2.5 ml of liquid (standard size in Europe). Its long handle is similar to an iced tea spoon, but is usually decorative and elegant..",
        "img": "https://d19umc0waopkcu.cloudfront.net/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/f/t/fta7010-3.jpg"
        }
}

@app.route('/')
def main():
    global learning_status

    return render_template('index.html', status=learning_status)


@app.route('/basics/<id>')
def basics(id):

    global learning_status
    global basic_material0
    global basic_material1
    print(id)

    if id=="0":
        return render_template('basic0.html', status=learning_status, data=basic_material0)
    else:
        return render_template('basic1.html', status=learning_status, data=basic_material1)


@app.route('/recipes/<id>')
def recipe(id):

    global recipe_data
    global learning_status
    id = int(id)

    return render_template('recipe.html', status=learning_status, data=recipe_data[int(id)], recipe_index=id)


@app.route('/quiz/<id>')
def quiz(id):

    global quiz
    global images
    global learning_status

    id = int(id)

    return render_template('quiz.html', status=learning_status, images=images, quiz_index=id)


@app.route('/progress/<option>')
def progress(option):

    global learning_status

    return render_template('progress.html', status=learning_status, option=option)


@app.route('/update_progress', methods=['GET', 'POST'])
def update_progress():

    global learning_status

    update_target = request.get_json()['update_target']
    index = int(update_target[-1])

    if "basics" in update_target:
        learning_status["basics"][index]["learned"] = True
    elif "recipe" in update_target:
        print(update_target)
        learning_status["recipes"][index]["learned"] = True
    else:
        learning_status["quizes"][index]["learned"] = True

    return jsonify(status=learning_status)


if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)
