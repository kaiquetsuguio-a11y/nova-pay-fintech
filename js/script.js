// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa os ícones do Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Animação e ajuste dinâmico das barras de limite
    atualizarBarrasDeLimite();

    // 3. Gerenciamento do Modal de Edição de Endereço
    configurarEdicaoEndereco();

    // 4. Efeito de clique nos links de navegação da Sidebar
    configurarNavegacaoSidebar();
});

/**
 * Função para alternar o estado dos links no menu lateral
 */
function configurarNavegacaoSidebar() {
    const navLinks = document.querySelectorAll('aside nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove as classes de item ativo de todos os links
            navLinks.forEach(item => {
                item.classList.remove('bg-gray-800', 'text-emerald-400', 'font-medium');
                item.classList.add('text-gray-400');
            });

            // Adiciona as classes ao link clicado
            const currentLink = e.currentTarget;
            currentLink.classList.remove('text-gray-400');
            currentLink.classList.add('bg-gray-800', 'text-emerald-400', 'font-medium');
        });
    });
}

/**
 * Recalcula o preenchimento (%) das barras de limites com base nos valores do HTML
 */
function atualizarBarrasDeLimite() {
    const secaoLimites = document.querySelectorAll('section:has(i[data-lucide="sliders"]) .space-y-4 > div');

    secaoLimites.forEach(limite => {
        const textoValores = limite.querySelector('.font-semibold');
        const barraProgresso = limite.querySelector('.bg-emerald-500');

        if (textoValores && barraProgresso) {
            // Extrai os valores numéricos do texto "R$ 8.200 / R$ 20.000"
            const texto = textoValores.textContent.replace(/R\$\s?/g, '').replace(/\./g, '');
            const partes = texto.split('/');

            if (partes.length === 2) {
                const atual = parseFloat(partes[0].trim());
                const total = parseFloat(partes[1].trim());

                if (!isNaN(atual) && !isNaN(total) && total > 0) {
                    const porcentagem = Math.min((atual / total) * 100, 100);
                    barraProgresso.style.width = `${porcentagem.toFixed(1)}%`;
                }
            }
        }
    });
}

/**
 * Cria e gerencia o modal de edição de endereço dinamicamente
 */
function configurarEdicaoEndereco() {
    // Procura pelo botão Editar na seção de endereço
    const btnEditar = document.querySelector('section:has(i[data-lucide="map-pin"]) button');
    
    if (!btnEditar) return;

    btnEditar.addEventListener('click', () => {
        // Seleciona os elementos de texto do endereço
        const ruaEl = document.querySelector('p:has(+ p:contains("Av."))') || document.querySelectorAll('section:has(i[data-lucide="map-pin"]) .grid div')[0].querySelectorAll('p')[1];
        const compEl = document.querySelectorAll('section:has(i[data-lucide="map-pin"]) .grid div')[1].querySelectorAll('p')[1];
        const bairroEl = document.querySelectorAll('section:has(i[data-lucide="map-pin"]) .grid div')[2].querySelectorAll('p')[1];
        const cepEl = document.querySelectorAll('section:has(i[data-lucide="map-pin"]) .grid div')[3].querySelectorAll('p')[1];

        // Solicita as novas informações ao usuário através do prompt ou insere um modal simples
        const novaRua = prompt("Editar Rua / Número:", ruaEl.textContent.trim());
        if (novaRua === null) return; // Cancelou

        const novoComp = prompt("Editar Complemento:", compEl.textContent.trim());
        if (novoComp === null) return;

        const novoBairro = prompt("Editar Bairro:", bairroEl.textContent.trim());
        if (novoBairro === null) return;

        const novoCep = prompt("Editar CEP:", cepEl.textContent.trim());
        if (novoCep === null) return;

        // Atualiza a tela
        if (novaRua) ruaEl.textContent = novaRua;
        if (novoComp) compEl.textContent = novoComp;
        if (novoBairro) bairroEl.textContent = novoBairro;
        if (novoCep) cepEl.textContent = novoCep;

        alert("Endereço atualizado com sucesso!");
    });
}
