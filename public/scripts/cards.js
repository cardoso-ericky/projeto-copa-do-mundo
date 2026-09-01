export default async function createCards(section) {
    try {
        const cardsContainer = document.createElement('div');
        cardsContainer.classList.add('flex', 'flex-row', 'flex-wrap', 'items-center', 'justify-around', 'gap-6', 'p-4');
        const response = await fetch('/api/copa');
        const selecoes = await response.json();
        selecoes.forEach(selecao => {
            const card = createCard(selecao);
            cardsContainer.appendChild(card);
        });
        section.appendChild(cardsContainer);
    } catch (error) {
        console.log(`Sorry, we couldn´t process the request: ${error}`);
        section.style.color = '#FF0000';
        section.innerHTML = `Bad request: ${error}`;
    }
}

function createCard(selecao) {
    const card = document.createElement('div');
    card.classList.add('flex', 'flex-col', 'justify-center', 'items-center', 'gap-2', 'shadow-sm', 'p-4', 'w-[200px]', 'min-h-[200px]');
    card.innerHTML = `
        <div class="flex flex-row justify-center items-center gap-2">
            <img class="" src="https://api.fifa.com/api/v3/picture/flags-sq-1/${selecao.sigla}" alt="">
            <h3 class="font-bold text-lg uppercase">${selecao.sigla}</h3>
        </div>
        <p class="font-bold text-base text-center capitalize">${selecao.nome}</p>
    `;
    if((selecao.titulos).length > 0){
        const titulos = document.createElement('div');
        titulos.classList.add('flex', 'flex-row', 'flex-wrap', 'justify-center', 'gap-2', 'text-sm');
        (selecao.titulos).forEach(titulo => {
            const item = document.createElement('span');
            item.classList.add('flex', 'flex-col', 'items-center', 'before:text-lg', "before:content-['🏆']");
            item.innerHTML = `${titulo}`;
            titulos.appendChild(item);
        });
        card.appendChild(titulos);
    }
    return card;
}