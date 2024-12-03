let paletteParticles = [];
let a = 0.0;
let cl = getRGBAValues(hexToRGBA(randomColor(), 1.0));

for(let y = 0; y < 5; y++) {
    paletteParticles.push({
        id: y,
        rgba: 'rgba(' + cl[0] + ',' + cl[1] + ',' + cl[2] + ',' + (cl[3] - a).toFixed(1) + ')',
        pos: 'out'
    });
    a += 0.2;
}

shuffleArray(paletteParticles);

for (let vv = paletteParticles.length - 1; vv >= 0; vv--) {
    document.querySelector('.palette_unsort').appendChild(paletteBlock(paletteParticles[vv]));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function paletteBlock(paletteColor) {
    const item = document.createElement('div');
    item.className = 'palette_particle';
    item.style.background = paletteColor.rgba;
    item.dataset.id = paletteColor.id;
    item.dataset.pos = paletteColor.pos;

    item.addEventListener('click', (e) => {
        if (e.target.dataset.pos == 'in') {
            document.querySelector('.palette_unsort').appendChild(e.target);
            e.target.dataset.pos = 'out';
        } else {
            document.querySelector('.palette_sort').appendChild(e.target);
            e.target.dataset.pos = 'in';
        }

        if (checkWin()) {
            setTimeout(() => {
                alert("Отлично! Давай следующий");
                window.location.reload();
            }, 300);
            
            
        }
    });

    return item;
}

function checkWin() {
    let particles = document.querySelector('.palette_sort').querySelectorAll('.palette_particle');
    let res = [];
    particles.forEach(particle => {
        res.push(particle.dataset.id);
    });

    return res.toString() === ['4','3','2','1','0'].toString();
}

function randomColor() {
    let hexString = "0123456789abcdef";
    let hexCode = "#";
    for( i = 0; i < 6; i++){
        hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    return hexCode;
}

function getRGBAValues(string) {
    var cleaned = string.substring(string.indexOf('(') +1, string.length-1);
    var split = cleaned.split(",");
    var intValues = [];
    for(var index in split){
        intValues.push(parseInt(split[index]));
    }

    return intValues;
}


function hexToRGBA(hex, alpha){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
    }
    return 'rgba(0,0,0,1)';
}
