let cidades;
let cidadeSelecionada;

let bodyTabela;

let form;
let txtNome;
let selEstado;
let btnNovo;
let btnSalvar;
let btnExcluir;

function iniciar() {
    
    bodyTabela = document.getElementById( "bodyTabelaCidades" );
    
    form = document.getElementById( "formCidade" );
    txtNome = document.getElementById( "txtNomeCidade" );
    selEstado = document.getElementById( "selEstadoCidade" );
    
    btnNovo = document.getElementById( "btnNovaCidade" );
    btnSalvar = document.getElementById( "btnSalvarCidade" );
    btnExcluir = document.getElementById( "btnExcluirCidade" );
    
    btnNovo.addEventListener( "click", event => {
        resetarFormulario();
    });
    
    btnSalvar.addEventListener( "click", event => {
        salvar();
    });
    
    btnExcluir.addEventListener( "click", event => {
        excluir();
    });
    
    carregar();
    
}

function carregar() {
    
    cidades = [];
    cidadeSelecionada = null;
    
    fetch( "api/cidades", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then( response => {
        
        if ( response.ok ) {
            return response.json();
        }
        
        response.text().then( text => {
            let error = JSON.parse( text );
            alert( error.message );
        });
        
        throw new Error( "" );
        
    }).then( data => {
        
        bodyTabela.innerHTML = "";
        cidades = data._embedded.cidades;
        
        cidades.forEach( ( cidade, indice ) => {
            
            const tr = document.createElement( "tr" );
            tr.dataset.indice = indice;
            
            const tId = document.createElement( "td" );
            tId.innerHTML = cidade.id;
            
            const tNome = document.createElement( "td" );
            tNome.innerHTML = cidade.nome;
            
            const tEstado = document.createElement( "td" );
            tEstado.innerHTML = cidade.estado.sigla;
            
            tr.addEventListener( "click", event => {
                cidadeSelecionada = cidades[event.target.parentNode.dataset.indice];
                preencherFormulario();
            });
            
            tr.append( tId, tNome, tEstado );
            bodyTabela.append( tr );
            
        });
        
    }).catch( error => {
        alert( error );
    });
    
}

function preencherFormulario() {
    
    txtNome.value = cidadeSelecionada.nome;
    selEstado.value = cidadeSelecionada.estado.id;
    
}

function resetarFormulario() {
    form.reset();
    cidadeSelecionada = null;
}

function salvar() {
    
    let obj = {};
    let metodo;
    let url = "api/cidades";
    
    // nova cidade
    if ( cidadeSelecionada === null ) {
        obj.nome = txtNome.value;
        obj.estado = "api/estados/" + selEstado.value;
        metodo = "POST";
    } else { // alterando uma cidade
        obj.nome = txtNome.value;
        obj.estado = "api/estados/" + selEstado.value;
        metodo = "PATCH";
        url += `/${cidadeSelecionada.id}`;
    }
    
    fetch( url, {
        method: metodo,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify( obj )
    }).then( response => {
        
        if ( response.ok ) {
            return response.json();
        }
        
        response.text().then( text => {
            let error = JSON.parse( text );
            alert( error.message );
        });
        
        throw new Error( "" );
        
    }).then( data => {
        carregar();
        resetarFormulario();
    }).catch( error => {
        alert( error );
    });
    
}

function excluir() {
    
    if ( cidadeSelecionada !== null ) {
        
        if ( confirm( "Deseja mesmo excluir a cidade selecionada?" ) ) {

            fetch( `api/cidades/${cidadeSelecionada.id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then( response => {

                if ( response.ok ) {
                    return response.json();
                }

                response.text().then( text => {
                    let error = JSON.parse( text );
                    alert( error.message );
                });

                throw new Error( "" );

            }).then( data => {
                carregar();
                resetarFormulario();
            }).catch( error => {
                alert( error );
            });
            
        } else {
            resetarFormulario();
        }
        
    } else {
        alert( "Escolha uma cidade para excluir!" );
    }
    
}

export function atualizarSelectEstados( estados ) {
    
    selEstado.innerHTML = "";
    
    estados.forEach( ( estado, indice ) => {
            
        const option = document.createElement( "option" );
        option.value = estado.id;
        option.innerHTML = estado.sigla;

        selEstado.append( option );

    });
        
}

iniciar();
