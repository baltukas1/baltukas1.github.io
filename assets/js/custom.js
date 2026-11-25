// 11 LD
document.addEventListener('DOMContentLoaded', function () {

  const forma = document.getElementById('kontaktu-forma');
  if (!forma) return;

  const laukai = forma.querySelectorAll('input');
  const siustiBtn = document.getElementById('siusti-btn');
  const isvalytiBtn = document.getElementById('isvalyti-btn');
  const rezultatas = document.getElementById('formos-rezultatas');

  // PAPILDOMA 1 – validacija
  function klaidosTekstas(laukas) {
    const reiksme = laukas.value.trim();

    if (reiksme === '') {
      return 'Šis laukas privalomas';
    }
    if ((laukas.name === 'vardas' || laukas.name === 'pavarde') &&
        !/^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/.test(reiksme)) {
      return 'Galima naudoti tik raides';
    }
    if (laukas.name === 'email' && !/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(reiksme)) {
      return 'Neteisingas el. pašto formatas';
    }
    if (laukas.name === 'telefonas' && !/^\+370 6\d{2} \d{5}$/.test(reiksme)) {
      return 'Formatas: +370 6xx xxxxx';
    }
    if (laukas.classList.contains('vertinimas')) {
      const skaicius = Number(reiksme);
      if (!Number.isInteger(skaicius) || skaicius < 1 || skaicius > 10) {
        return 'Įvertinimas turi būti nuo 1 iki 10';
      }
    }
    return '';
  }

  function rodytiKlaida(laukas) {
    const klaida = klaidosTekstas(laukas);
    laukas.classList.toggle('neteisingas', klaida !== '');
    laukas.nextElementSibling.textContent = klaida;
  }

  // 6 – mygtukas „Siųsti“ aktyvus tik be klaidų
  function atnaujintiMygtuka() {
    let viskasGerai = true;
    laukai.forEach(function (laukas) {
      if (klaidosTekstas(laukas) !== '') {
        viskasGerai = false;
      }
    });
    siustiBtn.disabled = !viskasGerai;
  }

  // PAPILDOMA 2 – telefono formatavimas
  function formatuotiTelefona(laukas) {
    let skaitmenys = laukas.value.replace(/\D/g, '');
    if (skaitmenys.startsWith('370')) {
      skaitmenys = skaitmenys.slice(3);
    } else if (skaitmenys.startsWith('8')) {
      skaitmenys = skaitmenys.slice(1);
    }
    skaitmenys = skaitmenys.slice(0, 8);

    if (skaitmenys === '') {
      laukas.value = '';
    } else if (skaitmenys.length <= 3) {
      laukas.value = '+370 ' + skaitmenys;
    } else {
      laukas.value = '+370 ' + skaitmenys.slice(0, 3) + ' ' + skaitmenys.slice(3);
    }
  }

  laukai.forEach(function (laukas) {
    laukas.addEventListener('input', function () {
      if (laukas.name === 'telefonas') {
        formatuotiTelefona(laukas);
      }
      rodytiKlaida(laukas);
      atnaujintiMygtuka();
    });
  });

  // 4 – formos duomenų apdorojimas
  forma.addEventListener('submit', function (e) {
    e.preventDefault();

    const duomenys = {
      vardas: forma.vardas.value.trim(),
      pavarde: forma.pavarde.value.trim(),
      email: forma.email.value.trim(),
      telefonas: forma.telefonas.value.trim(),
      adresas: forma.adresas.value.trim(),
      klausimas1: Number(forma.klausimas1.value),
      klausimas2: Number(forma.klausimas2.value),
      klausimas3: Number(forma.klausimas3.value)
    };

    console.log(duomenys);

    // 5 – vidurkis
    const vidurkis = (duomenys.klausimas1 + duomenys.klausimas2 + duomenys.klausimas3) / 3;

    const eilutes = [
      'Vardas: ' + duomenys.vardas,
      'Pavardė: ' + duomenys.pavarde,
      'El. paštas: ' + duomenys.email,
      'Tel. numeris: ' + duomenys.telefonas,
      'Adresas: ' + duomenys.adresas,
      'Dizaino įvertinimas: ' + duomenys.klausimas1,
      'Informacijos įvertinimas: ' + duomenys.klausimas2,
      'Rekomendacijos įvertinimas: ' + duomenys.klausimas3
    ];

    rezultatas.innerHTML = '';
    eilutes.forEach(function (tekstas) {
      const p = document.createElement('p');
      p.textContent = tekstas;
      rezultatas.appendChild(p);
    });

    const vidurkioEilute = document.createElement('p');
    vidurkioEilute.className = 'vidurkis';
    vidurkioEilute.textContent = duomenys.vardas + ' ' + duomenys.pavarde + ': ' + vidurkis.toFixed(1);
    rezultatas.appendChild(vidurkioEilute);
  });

  // PAPILDOMA 3 – mygtukas „Išvalyti“
  isvalytiBtn.addEventListener('click', function () {
    forma.reset();
    laukai.forEach(function (laukas) {
      laukas.classList.remove('neteisingas');
      laukas.nextElementSibling.textContent = '';
    });
    rezultatas.innerHTML = '';
    siustiBtn.disabled = true;
  });

});


// 12 LD
document.addEventListener('DOMContentLoaded', function () {

  if (!document.getElementById('sarasas-Atlikta')) return;

  // 1 – įgūdžių masyvas
  const pradiniaiIgudziai = [
    { pavadinimas: 'Relinė apsauga', busena: 'Planuojama', xp: 80, ikona: 'bi-shield-check' },
    { pavadinimas: 'PLC programavimas', busena: 'Planuojama', xp: 50, ikona: 'bi-cpu' },
    { pavadinimas: 'MATLAB modeliavimas', busena: 'Mokomasi', xp: 40, ikona: 'bi-graph-up' },
    { pavadinimas: 'Saulės elektrinių projektavimas', busena: 'Mokomasi', xp: 70, ikona: 'bi-sun' },
    { pavadinimas: 'Elektros grandinių skaičiavimas', busena: 'Atlikta', xp: 50, ikona: 'bi-lightning-charge' },
    { pavadinimas: 'AutoCAD brėžiniai', busena: 'Atlikta', xp: 40, ikona: 'bi-pencil-square' },
    { pavadinimas: 'Elektros instaliacijos projektavimas', busena: 'Atlikta', xp: 60, ikona: 'bi-plug' },
    { pavadinimas: 'Apšvietimo skaičiavimas', busena: 'Atlikta', xp: 30, ikona: 'bi-lightbulb' }
  ];

  const busenos = ['Planuojama', 'Mokomasi', 'Atlikta'];

  // PAPILDOMA 1 – Local Storage
  function ikeltiIgudzius() {
    const issaugoti = localStorage.getItem('igudziai');
    if (issaugoti) {
      return JSON.parse(issaugoti);
    }
    return pradiniaiIgudziai;
  }

  function issaugotiIgudzius() {
    localStorage.setItem('igudziai', JSON.stringify(igudziai));
  }

  let igudziai = ikeltiIgudzius();

  // 1, 2 – kortelių atvaizdavimas ir būsenos keitimas
  function piestiKorteles() {
    busenos.forEach(function (busena) {
      document.getElementById('sarasas-' + busena).innerHTML = '';
    });

    igudziai.forEach(function (igudis, indeksas) {
      const kortele = document.createElement('div');
      kortele.className = 'skill-card';

      const ikona = document.createElement('i');
      ikona.className = 'bi ' + igudis.ikona;

      const turinys = document.createElement('div');

      const pavadinimas = document.createElement('h4');
      pavadinimas.textContent = igudis.pavadinimas;

      const xp = document.createElement('span');
      xp.className = 'skill-xp';
      xp.textContent = 'XP: ' + igudis.xp;

      const pasirinkimas = document.createElement('select');
      pasirinkimas.className = 'skill-select';
      busenos.forEach(function (busena) {
        const variantas = document.createElement('option');
        variantas.value = busena;
        variantas.textContent = busena;
        if (busena === igudis.busena) {
          variantas.selected = true;
        }
        pasirinkimas.appendChild(variantas);
      });

      pasirinkimas.addEventListener('change', function () {
        igudziai[indeksas].busena = pasirinkimas.value;
        atnaujintiModuli();
      });

      turinys.appendChild(pavadinimas);
      turinys.appendChild(xp);
      turinys.appendChild(pasirinkimas);
      kortele.appendChild(ikona);
      kortele.appendChild(turinys);

      document.getElementById('sarasas-' + igudis.busena).appendChild(kortele);
    });
  }

  // 3 – XP, lygis ir rangas
  function skaiciuotiXP() {
    let suma = 0;
    igudziai.forEach(function (igudis) {
      if (igudis.busena === 'Atlikta') {
        suma += igudis.xp;
      }
    });
    return suma;
  }

  function gautiLygi(xp) {
    if (xp >= 300) return { lygis: 4, rangas: 'Profesionalas', nuo: 300, iki: 300 };
    if (xp >= 150) return { lygis: 3, rangas: 'Specialistas', nuo: 150, iki: 300 };
    if (xp >= 50) return { lygis: 2, rangas: 'Praktikantas', nuo: 50, iki: 150 };
    return { lygis: 1, rangas: 'Pradedantysis', nuo: 0, iki: 50 };
  }

  // 3, 4 – informacija ir progreso juosta
  function atnaujintiProgresa() {
    const xp = skaiciuotiXP();
    const lygis = gautiLygi(xp);

    document.getElementById('xp-suma').textContent = xp + ' XP';
    document.getElementById('xp-lygis').textContent = lygis.lygis;
    document.getElementById('xp-rangas').textContent = lygis.rangas;

    let procentai = 100;
    let tekstas = 'Pasiektas maksimalus lygis (' + xp + ' XP)';
    if (lygis.lygis < 4) {
      procentai = Math.round((xp - lygis.nuo) / (lygis.iki - lygis.nuo) * 100);
      tekstas = 'Progresas iki kito lygio (' + xp + ' / ' + lygis.iki + ' XP)';
    }

    const juosta = document.getElementById('progreso-juosta');
    juosta.style.width = procentai + '%';
    juosta.textContent = procentai + '%';
    document.getElementById('progreso-tekstas').textContent = tekstas;
  }

  // 5 – statistika
  function atnaujintiStatistika() {
    const viso = igudziai.length;
    let atlikta = 0;
    igudziai.forEach(function (igudis) {
      if (igudis.busena === 'Atlikta') {
        atlikta++;
      }
    });
    const procentas = Math.round(atlikta / viso * 100);

    document.getElementById('stat-viso').textContent = viso;
    document.getElementById('stat-atlikta').textContent = atlikta;
    document.getElementById('stat-procentas').textContent = procentas + '%';
  }

  // 7 – viskas atnaujinama kartu
  function atnaujintiModuli() {
    piestiKorteles();
    atnaujintiProgresa();
    atnaujintiStatistika();
    issaugotiIgudzius();
  }

  atnaujintiModuli();

});
