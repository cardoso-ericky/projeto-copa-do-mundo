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

/*
<section class="shadow-sm mx-auto w-7/8">
            <div class="bg-nightblue p-2">
                <h2 class="font-bold text-icewhite text-lg text-center">Seleções</h2>
            </div>
            <!-- Cards Container -->
            <div class="flex flex-row flex-wrap items-center gap-5 p-4">
                <!-- Card -->
                <div class="flex flex-col gap-2 shadow-sm p-4 w-[200px] min-h-[120px]">
                    <div class="flex flex-row justify-center items-center gap-2">
                        <img class="" src="https://api.fifa.com/api/v3/picture/flags-sq-1/BRA" alt="">
                        <h3 class="font-bold text-lg uppercase">BRA</h3>
                    </div>
                    <p class="font-bold text-base text-center capitalize">Brasil</p>
                    <div class="flex flex-row flex-wrap justify-center gap-2 text-sm">
                        <span class="flex flex-col items-center before:text-lg before:content-['🏆']">2002</span>
                        <span class="flex flex-col items-center before:text-lg before:content-['🏆']">1994</span>
                        <span class="flex flex-col items-center before:text-lg before:content-['🏆']">1970</span>
                        <span class="flex flex-col items-center before:text-lg before:content-['🏆']">1962</span>
                        <span class="flex flex-col items-center before:text-lg before:content-['🏆']">1958</span>
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center gap-2 shadow-sm p-4 w-[200px] min-h-[120px]">
                    <div class="flex flex-row justify-center items-center gap-2">
                        <img class="" src="https://api.fifa.com/api/v3/picture/flags-sq-1/CIV" alt="">
                        <h3 class="font-bold text-lg uppercase">BRA</h3>
                    </div>
                    <p class="font-bold text-base text-center capitalize">Brasil</p>
                </div>
            </div>
        </section>

*/