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
