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

data = [
    {
        "name": "Screwdriver",
        "description": "The screwdriver cocktail is a drink that deserves to be enjoyed ice cold and with fresh ingredients. The strong taste of the orange juice and the sharp vodka taste mix well and make it a drink you will never get tired of.",
        "image": "https://www.liquor.com/thmb/ANVBJ3_FZCXF5SVO7M17VXPMdzs=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__liquor__2017__11__06162348__screwdrvier-720x720-recipe-23e0c0ac47334f108e4fa00b34b7f5bf.jpg",
        "video": "https://www.youtube.com/embed/ckcV0K8Oc_Y?start=25",
        "items": [
            "A glass",
            "1 ½ oz. / 50ml Vodka",
            "4 ½ oz. / 150ml Fresh Orange Juice",
            "ice",
            "(optional) Orange Slice Garnish"
        ],
        "steps": [
            "Put ice into glass",
            "Add orange juice",
            "Add your choice of Vodka",
            "(optional) Cut a small slice of fresh orange, make a straight cut from the edge to the center, and put on glass",
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

images = {
    "vodka": "https://cdn.shopify.com/s/files/1/0013/2477/7569/products/absorg_1000x.jpg?v=1542752999"
}

@app.route('/')
def main():

    return render_template('index.html', images=homepage_images)


@app.route('/recipe-<id>')
def recipe(id):

    global data

    return render_template('recipe.html', data=data[int(id)])

@app.route('/quiz-<id>')
def quiz(id):

    global quiz
    global images

    return render_template('quiz.html', images=images, answer=quiz_answer[int(id)])

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)
