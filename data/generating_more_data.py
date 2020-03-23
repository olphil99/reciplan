import json
from faker import Faker
import random
filename = '../data/recipes_raw_nosource_epi.json'
# Loading recipe keys
with open(filename, 'r') as f:
    recipes_raw = json.load(f)
recipe_keys = list(recipes_raw.keys())
del recipes_raw

# Generating user-recipe ownership
with open('../data/ownership.txt','w') as fo:
    for k in recipes_raw.keys():
        fo.write(str(random.randint(1,500))+'\t'+k +'\n' )

# Generating user-recipe favorites
with open('../data/favorites.txt','w') as fo:
    for usr in range(1,501):
        fo.write(str(usr)+'\t'+recipe_keys[usr] +'\n' )

# Generating user-recipe carts
with open('../data/cart.txt','w') as fo:
    for usr in range(1,501):
        recipe_key_id = random.randint(0, len(recipe_keys)-1)
        month = random.randint(1,2)
        date = random.randint(1,29)
        dateUpdated = str(month)+'/'+str(date)
        fo.write(str(usr)+'\t'+recipe_keys[recipe_key_id] +'\t'+dateUpdated+'\n' )


# Generating user info inclusing usrid, name, address
fake = Faker()
names = set()
addresses = set()
while len(names)<500 :
    names.add(fake.name())
while len(addresses)<500:
    addr = fake.address()
    addresses.add(addr.replace('\n',', '))
names = list(names)
addresses = list(addresses)
print(len(names), len(addresses))

with open('../data/users.txt','w') as fo:
    for usrID in range(1,501):    
        fo.write(str(usrID)+'\t'+names[usrID-1]+'\t'+addresses[usrID-1]+'\n')