import createCards from "./cards.js";

const btnSelecoes = document.getElementById('btnSelecoes');
const btnGrupos = document.getElementById('btnGrupos');
const main = document.getElementById('conteudo');

btnSelecoes.addEventListener('click', async (event) => {
    event.preventDefault();
    main.innerHTML = '';
    const section = createSection("Seleções");
    await createCards(section);
    main.appendChild(section);
});

btnGrupos.addEventListener('click' , async (event) => {
    event.preventDefault();
    main.innerHTML = '';
    const section = createSection("Grupos")
    const containerGrupos = document.createElement('div');
    containerGrupos.classList.add('flex' , 'flex-row' , 'flex-wrap',
        'itensCenter', 'justify-around', 'gap-6', 'p-4');
        const resposta = await fetch('/api/grupos');
        const grupos = await resposta.json();
        grupos.forEach(grupo => {
            const cardGrupo = document.createElement('div');
            cardGrupo.classList.add('card__grupo');
            cardGrupo.innerHTML =`
            <h3 class="grupo__letra font-bold text-xl pb-5 flex justify-center">${grupo.grupo}</h3>
        <div class="grupo__selecoes>

            <div class="selecoes__pais pt-8">
               <img class+"pais__flag" src="https://api.fifa.com/api/v3/picture/flags-sq-1/${grupo.selecoes[0]}"
               alt="Bandeira do ${grupo.selecoes[0]}">
               <span class="pais__sigla text-lg">${grupo.selecoes[0]}</span>
            </div>

            <div class="selecoes__pais pt-8">
               <img class+"pais__flag" src="https://api.fifa.com/api/v3/picture/flags-sq-1/${grupo.selecoes[1]}"
               alt="Bandeira do ${grupo.selecoes[1]}">
               <span class="pais__sigla text-lg">${grupo.selecoes[1]}</span>

            </div>

            <div class="selecoes__pais pt-8">
               <img class+"pais__flag" src="https://api.fifa.com/api/v3/picture/flags-sq-1/${grupo.selecoes[2]}"
               alt="Bandeira do ${grupo.selecoes[2]}">
               <span class="pais__sigla text-lg">${grupo.selecoes[2]}</span>

            </div>

            <div class="selecoes__pais pt-8">
               <img class+"pais__flag" src="https://api.fifa.com/api/v3/picture/flags-sq-1/${grupo.selecoes[3]}"
               alt="Bandeira do ${grupo.selecoes[3]}">
               <span class="pais__sigla text-lg">${grupo.selecoes[3]}</span>

            </div>
        </div>
            
            `;
            containerGrupos.appendChild(cardGrupo);

        });
        section.appendChild(containerGrupos);
        main.appendChild(section);
    });

function createSection(titulo){
    const section = document.createElement('section');
    section.classList.add('shadow-sm', 'mx-auto', 'w-7/8');
    section.innerHTML = `
        <div class="bg-nightblue p-2">
            <h2 class="font-bold text-icewhite text-lg text-center">${titulo}</h2>
        </div>`;
    return section;
}