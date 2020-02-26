from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


current_id = 4

sales = [
    {
        "id": 1,
        "salesperson": "James D. Halpert",
        "client": "Shake Shack",
        "reams": 1000
    },
    {
        "id": 2,
        "salesperson": "Stanley Hudson",
        "client": "Toast",
        "reams": 4000
    },
    {
        "id": 3,
        "salesperson": "Michael G. Scott",
        "client": "Computer Science Department",
        "reams": 10000
    }
]

clients = [
    "Shake Shack",
    "Toast",
    "Computer Science Department",
    "Teacher's College",
    "Starbucks",
    "Subsconsious",
    "Flat Top",
    "Joe's Coffee",
    "Max Caffe",
    "Nussbaum & Wu",
    "Taco Bell",
]

non_ppc_people = [
    "Phyllis",
    "Dwight",
    "Oscar",
    "Creed",
    "Pam",
    "Jim",
    "Stanley",
    "Michael",
    "Kevin",
    "Kelly"
    ]

ppc_people = [
    "Angela"
    ]


@app.route('/infinity')
def infinity():
    return render_template('cu-paper-infinity.html', sales=sales, clients=clients)

@app.route('/save_sale', methods=['GET', 'POST'])
def save_sale():

    global current_id
    global sales
    global clients

    json_data = request.get_json()

    sales.insert(0,{
        "id": current_id,
        "salesperson": json_data["salesperson"],
        "client": json_data["client"],
        "reams": json_data["reams"]
    })
    current_id += 1

    if json_data["client"] not in clients:
        clients.append(json_data["client"])

    return jsonify(sales=sales, clients=clients)


@app.route('/delete_sale', methods=['GET', 'POST'])
def delete_sale():

    global current_id
    global sales

    json_data = request.get_json()
    
    sales.pop(int(json_data["id"])-1)
    for i, sale in enumerate(sales):
        sale["id"] = i + 1
    current_id -= 1

    return jsonify(sales=sales)

@app.route('/ppc')
def ppc():
    return render_template('ppc.html', ppc=ppc_people, nppc=non_ppc_people)

@app.route('/move_person', methods=['GET', 'POST'])
def move_person():

    global ppc_people
    global non_ppc_people

    json_data = request.get_json()

    target = json_data["target"]
    name = json_data["name"]

    # remove name from either list
    if name in ppc_people:
        ppc_people.remove(name)
    else:
        non_ppc_people.remove(name)

    # add name to th target list
    if target=="ppc":
        ppc_people.append(json_data["name"])
    else:
        non_ppc_people.append(json_data["name"])

    return jsonify(ppc=ppc_people, nppc=non_ppc_people)


if __name__ == '__main__':
   app.run(debug = True)




