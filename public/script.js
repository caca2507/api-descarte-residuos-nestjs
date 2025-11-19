const API_URL = 'http://localhost:3000';

// --- 1. Ao carregar a página ---
document.addEventListener('DOMContentLoaded', () => {
    carregarOpcoesDePontos();
    carregarHistorico();
    carregarRelatorio();
});

// --- 2. Função para cadastrar Ponto (POST /pontos) ---
document.getElementById('form-ponto').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        nomeLocal: document.getElementById('nomeLocal').value,
        bairro: document.getElementById('bairro').value,
        tipoLocal: document.getElementById('tipoLocal').value,
        categoria: document.getElementById('categoria').value,
        latitude: parseFloat(document.getElementById('latitude').value),
        longitude: parseFloat(document.getElementById('longitude').value),
    };

    try {
        const res = await fetch(`${API_URL}/pontos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            alert('Ponto cadastrado com sucesso!');
            carregarOpcoesDePontos(); // Atualiza o dropdown do outro formulário
            e.target.reset(); // Limpa o formulário
        } else {
            alert('Erro ao cadastrar ponto.');
        }
    } catch (err) { console.error(err); }
});

// --- 3. Função para carregar Pontos no Dropdown ---
async function carregarOpcoesDePontos() {
    const select = document.getElementById('pontoId');
    try {
        const res = await fetch(`${API_URL}/pontos`);
        const pontos = await res.json();
        select.innerHTML = '<option value="">Selecione um Local...</option>';
        pontos.forEach(p => {
            const option = document.createElement('option');
            option.value = p.id;
            option.textContent = `${p.nomeLocal} (${p.bairro})`;
            select.appendChild(option);
        });
    } catch (err) { console.error(err); }
}

// --- 4. Função para registrar Descarte (POST /registros) ---
document.getElementById('form-descarte').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Nota: O PDF da Aula 8 fala "/descartes", mas na Aula 7 criamos "/registros".
    // Vamos usar /registros para manter compatibilidade.
    const data = {
        nomeUsuario: document.getElementById('nomeUsuario').value,
        pontoId: parseInt(document.getElementById('pontoId').value),
        tipoResiduo: document.getElementById('tipoResiduo').value,
        data: new Date(document.getElementById('dataDescarte').value).toISOString()
    };

    try {
        const res = await fetch(`${API_URL}/registros`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            alert('Descarte registrado!');
            carregarHistorico(); // Atualiza a tabela
            carregarRelatorio(); // Atualiza o dashboard
            e.target.reset();
        } else {
            alert('Erro ao registrar descarte.');
        }
    } catch (err) { console.error(err); }
});

// --- 5. Carregar Histórico (GET /registros) ---
async function carregarHistorico() {
    const tbody = document.getElementById('tabela-corpo');
    tbody.innerHTML = '<tr><td colspan="4">Carregando...</td></tr>';
    
    try {
        const res = await fetch(`${API_URL}/registros`);
        const registros = await res.json();
        tbody.innerHTML = '';

        registros.forEach(r => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${new Date(r.data).toLocaleString()}</td>
                <td>${r.nomeUsuario}</td>
                <td>${r.tipoResiduo}</td>
                <td>${r.ponto ? r.ponto.nomeLocal : 'ID: ' + r.pontoId}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) { console.error(err); }
}

// --- 6. Carregar Relatório (GET /relatorio) ---
async function carregarRelatorio() {
    try {
        const res = await fetch(`${API_URL}/relatorio`);
        const data = await res.json();

        // Preenche os cards do Dashboard
        document.getElementById('dash-total-pontos').innerText = data.totalDePontosDeDescarteCadastrados;
        document.getElementById('dash-total-users').innerText = data.numeroTotalDeUsuariosNoSistema;
        
        // Verifica se existem dados antes de tentar acessar propriedades
        const residuo = data.tipoDeResiduoMaisFrequente;
        document.getElementById('dash-comum').innerText = residuo ? residuo.tipoResiduo : 'N/A';
        
        const local = data.localDeDescarteComMaiorNumeroDeRegistros;
        document.getElementById('dash-local-top').innerText = local ? `ID: ${local.pontoId}` : 'N/A';

    } catch (err) { console.error(err); }
}