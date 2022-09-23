const fs = require('fs');
const csv = require('fast-csv');

const args = process.argv;

// TODO: fix this all up
const usage_error = () => {
    const usage_text = `
    connected-cities

    usage:
        node src/index.js        (runs from default file resources/test_file.csv)
                                 (equivalent to npm run withFile)
        node src/index.js <file> (file path to run the application with)
                                 (equivalent to npm run main -- <file>)
    `;
    console.error(usage_text);
};

(async () => {
    if (args.length == 2) {
        console.log(`1 arg = ${args[1]}`);
    } else if (args.length == 3) {
        console.log(`2 args, arg1=${args[1]}, arg2=${args[2]}`);
        let d = await read_csv_file_to_arry(args[2]);
        console.log(`data = ${d}`);
        create_connected_cities(d);
        console.log(`connected_cities = ${display_connected_str()}`);
    } else {
        usage_error();
    }
})()

async function load_test_file() {
    let d = await read_csv_file_to_arry("resources/test_file.csv");
    console.log(`data = ${d}`);
    create_connected_cities(d);
}

async function read_csv_file_to_arry(filepath) {
    // csv.CsvParserStream
    // NOTE: Why wont this return with the data?
    let data = [];
    let done = false;
    let x = fs.createReadStream(filepath)
        .pipe(csv.parse({headers: false}))
        .on('error', (err) => {
            console.error(`error: failed to read file ${filepath}, err=${err}`);
            done = true;
        })
        .on('data', (row) => data.push(row))
        .on('end', () => {
            console.log(`success: read ${filepath}`);
            done = true;
        });
    while (!done) {
        await delay(100);
    } 
    return data;
}

const connected_cities = [];

function display_connected_str() {
    var str = "[";
    for (const s of connected_cities) {
        str += "{";
        for (const e of s.entries()) {
            // e[1] is the value, e[0] is the key?
            str += `${e[1]},`;
        }
        str += "}";
    }
    str += "]";
    return str;
}
function display_bucket(idx) {
    var str = "{";
    for (const e of connected_cities[idx]) {
        str += `${e},`;
    }
    str += "}";
    return str;
}
function insert_cities(city1, city2) {
    const index1 = is_city_connected(city1);
    if (index1 !== -1) {
        connected_cities[index1].add(city2)
        return;
    }
    const index2 = is_city_connected(city2);
    if (index2 !== -1) {
        connected_cities[index2].add(city1)
        return;
    }
    var s = new Set();
    s.add(city1);
    s.add(city2);
    connected_cities.push(s);
}
// return index in array if it exists in one of the sets otherwise return -1
function is_city_connected(city) {
    for (var idx = 0; idx < connected_cities.length; idx++) {
        if (connected_cities[idx].has(city)) {
            return idx;
        }
    }
    return -1;
}
function are_these_cities_connected(c1, c2) {
    for (var idx = 0; idx < connected_cities.length; idx++) {
        if (connected_cities[idx].has(c1) && connected_cities[idx].has(c2)) {
            console.log(`Connected Bucket of Cities = ${display_bucket(idx)}`)
            return true;
        }
    }
    return false;
}
function create_connected_cities(rows) {
    // console.log(`rows = ${rows}`);
    for (const row of rows) {
        // console.log(`row=${row}`);
        const [c1, c2] = row;
        console.log(`c1=${c1}, c2=${c2}`);
        insert_cities(c1, c2);
    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

module.exports = { load_test_file, are_these_cities_connected };