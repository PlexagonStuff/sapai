import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {Server} from 'socket.io';
import OpenAI from 'openai';

const app = express();
const server = createServer(app);
const __dirname = dirname(fileURLToPath(import.meta.url));
const io = new Server(server);
const openai = new OpenAI({
    apiKey: process.env.APIKEY
});

const petIDs = {
    "Ant":0,
    "Badger":2,
    "Beaver":3,
    "Bee":4,
    "Bison":5,
    "Blowfish":7,
    "Buffalo":8,
    "Butterfly":9,
    "Camel":10,
    "Cat":11,
    "Caterpillar":12,
    "Chick":13,
    "Chicken":14,
    "Cow":15,
    "Crab":16,
    "Cricket":17,
    "Cockroach":18,
    "Crocodile":19,
    "Deer":20,
    "Dodo":21,
    "Dog":22,
    "Dolphin":23,
    "Dove":24,
    "Dragon":25,
    "Duck":26,
    "Eagle":27,
    "Elephant":28,
    "Flamingo":29,
    "Fly":30,
    "Zombie Fly":31,
    "Fish":32,
    "Giraffe":33,
    "Goat":34,
    "Gorilla":36,
    "Hedgehog":37,
    "Hippo":38,
    "Horse":39,
    "Kangaroo":40,
    "Leopard":41,
    "Lion":42,
    "Llama":44,
    "Mammoth":45,
    "Monkey":46,
    "Mosquito":47,
    "Mouse":48,
    "Octopus":50,
    "Otter":51,
    "Ox":52,
    "Parrot":53,
    "Peacock":54,
    "Rhino":55,
    "Penguin":56,
    "Rat":57,
    "Dirty Rat":58,
    "Pig":59,
    "Rabbit":60,
    "Ram":62,
    "Rooster":63,
    "Scorpion":65,
    "Seal":66,
    "Shrimp":67,
    "Sheep":68,
    "Shark":69,
    "Skunk":70,
    "Sloth":71,
    "Snail":72,
    "Snake":73,
    "Spider":74,
    "Squirrel":75,
    "Swan":76,
    "Tiger":77,
    "Tyrannosaurus":78,
    "Turkey":79,
    "Turtle":80,
    "Whale":81,
    "Worm":82,
    "Bus":85,
    "Zombie Cricket":86,
    "Bat":87,
    "Beetle":88,
    "Bluebird":89,
    "Hatching Chick":91,
    "Ladybug":92,
    "Lobster":93,
    "Microbe":94,
    "Owl":95,
    "Poodle":96,
    "Puppy":97,
    "Sauropod":98,
    "Tabby Cat":99,
    "Tropical Fish":100,
    "Boar":103,
    "Dromedary":104,
    "Anteater":105,
    "Fox":106,
    "Panda":107,
    "Polar Bear":108,
    "Guinea Pig":109,
    "Hamster":110,
    "Donkey":111,
    "Koala":112,
    "Duckling":113,
    "Lioness":114,
    "Velociraptor":115,
    "Orca":116,
    "Clownfish":117,
    "Piranha":118,
    "Sword Fish":119,
    "Eel":120,
    "Gold Fish":121,
    "Jellyfish":122,
    "Hammerhead Shark":123,
    "Komodo":124,
    "Ostrich":125,
    "Praying Mantis":126,
    "Hawk":127,
    "Seagull":128,
    "Pelican":129,
    "Okapi":130,
    "Kiwi":131,
    "Atlantic Puffin":132,
    "Cassowary":133,
    "Shoebill":134,
    "Vulture":135,
    "Stork":136,
    "Frigatebird":137,
    "Hummingbird":138,
    "Frog":139,
    "Bear":140,
    "Moth":141,
    "Triceratops":142,
    "Spinosaurus":143,
    "Stegosaurus":144,
    "Pug":145,
    "Siberian Husky":146,
    "Iguana":147,
    "Sabertooth Tiger":148,
    "Pillbug":149,
    "Blobfish":150,
    "Toucan":151,
    "Seahorse":152,
    "Starfish":153,
    "Capybara":154,
    "Zebra":155,
    "Woodpecker":156,
    "Orangutan":157,
    "Raccoon":158,
    "Platypus":159,
    "Wasp":160,
    "Chinchilla":161,
    "Toad":162,
    "Yak":163,
    "Salamander":164,
    "Leech":165,
    "Armadillo":166,
    "Hyena":167,
    "Mole":168,
    "Porcupine":169,
    "Wolf":170,
    "Baboon":171,
    "Ferret":172,
    "Weasel":173,
    "Catfish":174,
    "Sealion":175,
    "Cuttlefish":176,
    "Squid":177,
    "Sting Ray":178,
    "Guinea Piglet":179,
    "Anglerfish":180,
    "Bird of Paradise":181,
    "Beluga Whale":182,
    "Loyal Chinchilla":183,
    "Chipmunk":184,
    "Gazelle":185,
    "Highland Cow":186,
    "Opossum":187,
    "Golden Retriever":188,
    "Bulldog":189,
    "Mantis Shrimp":190,
    "Sea Turtle":191,
    "Manatee":192,
    "Aardvark":193,
    "Alpaca":194,
    "Crow":195,
    "Dragonfly":196,
    "Emperor Tamarin":197,
    "Frilled Dragon":198,
    "Jerboa":199,
    "Lynx":200,
    "Lionfish":201,
    "Moose":202,
    "Meerkat":203,
    "Marmoset":204,
    "Reindeer":205,
    "White Tiger":206,
    "Wombat":207,
    "Tapir":208,
    "Walrus":209,
    "African Penguin":210,
    "Axolotl":212,
    "Beluga Sturgeon":213,
    "Betta Fish":214,
    "Black Necked Stilt":215,
    "Chameleon":216,
    "Cobra":217,
    "Cockatoo":218,
    "Crane":219,
    "Door Head Ant":220,
    "Egyptian Vulture":221,
    "Elephant Seal":222,
    "Emu":223,
    "Falcon":224,
    "Flea":225,
    "Flying Fish":226,
    "Flying Squirrel":227,
    "Guineafowl":228,
    "Gecko":229,
    "German Sheperd":230,
    "Gharial":231,
    "Goose":232,
    "Groundhog":233,
    "Hercules Beetle":234,
    "Hoopoe Bird":235,
    "Lemur":236,
    "Lizard":237,
    "Macaque":238,
    "Magpie":239,
    "Manta Ray":240,
    "Mongoose":241,
    "Mosasaurus":242,
    "Musk Ox":245,
    "Nyala":246,
    "Osprey":247,
    "Oyster":248,
    "Pangolin":249,
    "Panther":250,
    "Pied Tamarin":251,
    "Poison Dart Frog":252,
    "Pteranodon":253,
    "Puma":254,
    "Robin":255,
    "Royal Flycatcher":256,
    "Saiga Antelope":257,
    "Sea Urchin":258,
    "Secretary Bird":259,
    "Silkmoth":260,
    "Silver Fox":261,
    "Slug":262,
    "Stoat":263,
    "Surgeon Fish":264,
    "Vaquita":265,
    "Warthog":266,
    "Whale Shark":267,
    "Wildebeest":268,
    "Wolverine":269,
    "Smaller Slug":270,
    "Blue Ringed Octopus":271,
    "Cone Snail":272,
    "Doberman":273,
    "Fire Ant":274,
    "Grizzly Bear":275,
    "Nurse Shark":276,
    "Snapping Turtle":277,
    "Stonefish":278,
    "Lizard Tail":282,
    "Tiger Bug":330,
    "Anubis":331,
    "Basilisk":332,
    "Behemoth":333,
    "Bigfoot":334,
    "Great One":335,
    "Calygreyhound":336,
    "Cerberus":337,
    "Chimera":338,
    "Chupacabra":339,
    "Cockatrice":340,
    "Drop Bear":341,
    "Fairy":342,
    "Fire Pup":343,
    "Frost Wolf":344,
    "Gargoyle":345,
    "Ghost Kitten":346,
    "Griffin":348,
    "Brain Cramp":349,
    "Hippocampus":350,
    "Hydra":352,
    "Jackalope":353,
    "Kitsune":354,
    "Kraken":355,
    "Leviathan":356,
    "Mandrake":357,
    "Manticore":358,
    "Mimic":359,
    "Minotaur":360,
    "Murmel":362,
    "Nessie":363,
    "Ouroboros":364,
    "Pegasus":365,
    "Phoenix":366,
    "Quetzalcoatl":367,
    "Red Dragon":368,
    "Roc":369,
    "Salmon of Knowledge":370,
    "Worm of Sand":371,
    "Sea Serpent":372,
    "Abomination":373,
    "Skeleton Dog":374,
    "Slime":375,
    "Sphinx":376,
    "Axehandle Hound":377,
    "Tree":378,
    "Tsuchinoko":379,
    "Unicorn":380,
    "Vampire Bat":381,
    "Warf":382,
    "Werewolf":383,
    "Monty":384,
    "Wyvern":385,
    "Visitor":386,
    "Yeti":387,
    "Tahr":393,
    "Mandrill":405,
    "Smallest Slug":477,
    "Nest":508,
    "Hare":551,
    "Pigeon":559,
    "Bunyip":601,
    "Mothman":604,
    "Nightcrawler":605,
    "Sleipnir":606,
    "Tandgnost":607,
    "Tandgrisner":608,
    "Thunderbird":610,
    "Cuddle Toad":611,
    "Old Mouse":612,
    "Bad Dog":613,
    "Fake Nessie":614,
    "Questing Beast":616,
    "Sneaky Egg":617,
    "Pixiu":619,
    "Barghest":621,
    "Rootling":622,
    "Lucky Cat":623,
    "Foo Dog":625,
    "Alchemedes":626,
    "Baku":628,
    "Cyclops":630,
    "Golden Beetle":634,
    "Mana Hound":635,
    "Team Spirit":636,
    "Rock":638,
    "Ogopogo":639,
    "Loveland Frogman":640,
    "Daycrawler":641,
    "Smaller Slime":642,
    "Hydra Head":643,
    "Giant Eyes Dog":644,
    "Young Phoenix":646,
    "Cracked Egg":647,
    "Chimera Goat":648,
    "Chimera Snake":649,
    "Chimera Lion":650,
    "Deer Lord":651,
    "Jersey Devil":652,
    "Fur-Bearing Trout":653,
    "Tatzelwurm":654,
    "Kappa":655,
    "Boitata":656,
    "Nurikabe":657,
    "Good Dog":658,
    "Burbel":659,
    "Moby Dick":1000
}

const freetoplay = {
    "1":["Ant", "Beaver", "Cricket", "Duck", "Fish", "Frilled Dragon", "Horse", "Mosquito", "Otter", "Pig", "Pigeon", "Chinchilla", "Moth", "Marmoset"],
    "2":["Crab", "Flamingo", "Hedgehog", "Kangaroo", "Peacock", "Rat", "Snail", "Spider", "Swan", "Wombat", "Worm", "Frigatebird", "Shrimp", "Toucan"],
    "3":["Aardvark", "Badger", "Bear", "Camel", "Dodo", "Dog", "Dolphin", "Elephant", "Emperor Tamarin", "Giraffe", "Ox", "Porcupine", "Rabbit", "Sheep", "Wasp", "Gold Fish", "Mole"],
    "4":["Bison", "Blowfish", "Deer", "Dragonfly", "Hippo", "Jerboa", "Lynx", "Parrot", "Penguin", "Seagull", "Skunk", "Squirrel", "Turtle", "Whale", "Doberman"],
    "5":["Alpaca", "Armadillo", "Cow", "Crocodile", "Hyena", "Monkey", "Moose", "Raccoon", "Rhino", "Rooster", "Scorpion", "Seal", "Shark", "Turkey"],
    "6":["Boar", "Cat", "Dragon", "Fly", "Gorilla", "Leopard", "Lioness", "Mammoth", "Snake", "Tapir", "Tiger", "Walrus", "White Tiger", "Wolverine", "Lionfish"]
}

const unicorn = {
    "1":["Alchemedes", "Axehandle Hound", "Baku", "Barghest", "Bunyip", "Cuddle Toad", "Murmel", "Sneaky Egg", "Tsuchinoko", "Warf", "Basilisk"],
    "2":["Bigfoot", "Drop Bear", "Frost Wolf", "Gargoyle", "Ghost Kitten", "Jackalope", "Lucky Cat", "Mothman", "Ogopogo", "Thunderbird", "Nightcrawler", "Sphinx", "Chupacabra", "Golden Beetle"],
    "3":["Brain Cramp", "Calygreyhound", "Fur-Bearing Trout", "Griffin", "Mana Hound", "Mandrake", "Minotaur", "Ouroboros", "Skeleton Dog", "Wyvern", "Foo Dog", "Tree", "Slime", "Pegasus", "Deer Lord"],
    "4":["Abomination", "Chimera", "Cyclops", "Kraken", "Roc", "Tatzelwurm", "Tiger Bug", "Unicorn", "Visitor", "Worm of Sand", "Fairy", "Rootling", "Anubis", "Old Mouse", "Hippocampus"],
    "5":["Bad Dog", "Jersey Devil", "Kitsune", "Loveland Frogman", "Nessie", "Pixiu", "Red Dragon", "Salmon of Knowledge", "Vampire Bat", "Werewolf", "Boitata", "Kappa", "Mimic", "Nurikabe", "Tandgnost", "Tandgrisner"],
    "6":["Behemoth", "Cerberus", "Hydra", "Manticore", "Phoenix", "Quetzalcoatl", "Sea Serpent", "Sleipnir", "Team Spirit", "Yeti", "Great One", "Leviathan", "Questing Beast", "Cockatrice"]
}

const star = {
    "1":["Cockroach", "Duckling", "Frog", "Hummingbird", "Kiwi", "Marmoset", "Mouse", "Pillbug", "Seahorse"],
    "2":["Atlantic Puffin", "Dove", "Guinea Pig", "Iguana", "Jellyfish", "Koala", "Panda", "Salamander", "Stork", "Yak"],
    "3":["Anteater", "Capybara", "Cassowary", "Eel", "Leech", "Okapi", "Pug", "Toad", "Woodpecker"],
    "4":["Blobfish", "Clownfish", "Crow", "Donkey", "Hawk", "Orangutan", "Pelican", "Praying Mantis", "Starfish", "Platypus"],
    "5":["Fox", "Hamster", "Lion", "Polar Bear", "Shoebill", "Siberian Husky", "Sword Fish", "Triceratops", "Vulture", "Zebra"],
    "6":["Hammerhead Shark", "Komodo", "Orca", "Ostrich", "Piranha", "Reindeer", "Sabertooth Tiger", "Spinosaurus", "Stegosaurus", "Velociraptor"]
}

const golden = {
    "1":["Bulldog", "Magpie", "Groundhog", "Pied Tamarin", "Silkmoth", "Opossum", "Chipmunk", "Cone Snail", "Goose"],
    "2":["African Penguin", "Door Head Ant", "Black Necked Stilt", "Sea Urchin", "Squid", "Sea Turtle", "Lizard", "Hercules Beetle", "Stoat", "Gazelle"],
    "3":["Surgeon Fish", "Baboon", "Royal Flycatcher", "Weasel", "Betta Fish", "Flea", "Osprey", "Musk Ox", "Flying Fish", "Guineafowl", "Meerkat"],
    "4":["Cockatoo", "Sealion", "Manta Ray", "Manatee", "Vaquita", "Cuttlefish", "Slug", "Poison Dart Frog", "Saiga Antelope", "Falcon", "Secretary Bird"],
    "5":["Silver Fox", "Blue Ringed Octopus", "Beluga Whale", "Emu", "Nyala", "Fire Ant", "Nurse Shark", "Wolf", "Crane", "Egyptian Vulture", "Macaque"],
    "6":["Wildebeest", "Warthog", "Grizzly Bear", "Cobra", "Pteranodon", "German Shepherd", "Oyster", "Bird of Paradise", "Highland Cow", "Catfish"]
}

const puppy = {
    "1":["Ferret", "Bluebird", "Ladybug", "Duck", "Beaver", "Chipmunk", "Chichilla", "Beetle", "Moth", "Gecko"],
    "2":["Lemur", "Mandrill", "Toucan", "Beluga Sturgeon", "Frigatebird", "Shrimp", "Tabby Cat", "Bat", "Robin", "Dromedary"],
    "3":["Hare", "Puppy", "Tropical Fish", "Hatching Chick", "Gold Fish", "Hoopoe Bird", "Pangolin", "Mole", "Flying Squirrel", "Owl"],
    "4":["Gharial", "Chameleon", "Llama", "Tahr", "Microbe", "Lobster", "Whale Shark", "Doberman", "Caterpillar", "Buffalo"],
    "5":["Sting Ray", "Poodle", "Stonefish", "Chicken", "Snapping Turtle", "Eagle", "Goat", "Axolotl", "Mosasaurus", "Panther"],
    "6":["Octopus", "Anglerfish", "Mongoose", "Tyrannosaurus", "Lionfish", "Sauropod", "Puma", "Elephant Seal", "Mantis Shrimp", "Dragon"]
}


app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {

    socket.on("generate", async (data) => {
        io.to(socket.id).emit("packStart");
        console.log(data);
        const packs = Object.keys(data);
        var animalList = [];
        for (var i = 1; i < 7; i++) {
            var sendingList = []
            if (packs.includes("freetoplay")){
                //console.log(freetoplay)
                //console.log(freetoplay[i.toString()]);
                sendingList = sendingList.concat(freetoplay[i.toString()]);
            }
            if (packs.includes("puppy")){
                sendingList = sendingList.concat(puppy[i.toString()]);
            }
            if (packs.includes("unicorn")){
                sendingList = sendingList.concat(unicorn[i.toString()]);
            }
            if (packs.includes("golden")){
                sendingList = sendingList.concat(golden[i.toString()]);
            }
            if (packs.includes("star")){
                sendingList = sendingList.concat(star[i.toString()]);
            }
            //console.log(sendingList);
            let test = await generateKey(sendingList, data["prompt"]);
            test = JSON.parse(test);
            console.log(test);
            animalList = animalList.concat(test["animals"]);
        }
        console.log(animalList);
        var animalIDs = [];
        for (var animals of animalList) {
            animalIDs.push(petIDs[animals]);
        }
        console.log(animalIDs);
        let customPack = {
            "Title": data["prompt"] + "|SAPAI",
            "Minion": 659,
            "Minions": animalIDs,
            "Spells": [40,0,92,9,50,61,73,38,31,16,58,23,82,34,21,96,51]
        }
        io.to(socket.id).emit("packCreated", {"pack": JSON.stringify(customPack)});
    });
    

});

server.listen(process.env.PORT, () => {
    console.log('server running at ' + process.env.PORT);
});

async function generateKey(list, prompt) {
    console.log(list);
    console.log(prompt);
    const message = 'The prompt is ' + prompt + ' and the list of animals is ' + list.toString() + ' Your task is given this list of animals and the given theme/prompt, to return a JSON object formatted as {animals: []}. The array will have ten of the given animals that best fit, reference, or embody the theme/prompt. Make sure every animal is from the given list and Do not have duplicates of animals contained within this JSON file. '
    const response = await openai.chat.completions.create({
        messages: [
            {
                role: 'user',
                content: message
            }

        ],
        model: 'gpt-3.5-turbo',
        response_format: { type: "json_object" }

    });
    //console.log(response);
    return  response["choices"][0]["message"]["content"];
}