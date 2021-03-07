const fs = require("fs")

module.exports = (client) => {
    fs.readdir('./events/', (err, files) => {
    if(err) console.error(err)
    let jsfiles = files.filter(f => f.split(".").pop() === "js")
    if(jsfiles.length <= 0) return console.log("Pas  d'events à charger")
    console.log(`Chargement de ${jsfiles.length} events`);
    jsfiles.forEach((f, i) => {
        require(`../events/${f}`);
        console.log(`${i + 1}: ${f} chargé !`)
    })
})
}
