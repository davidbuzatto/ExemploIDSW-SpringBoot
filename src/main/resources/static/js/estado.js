let estados;
let estadoSelecionado;

let bodyTabela;

let form;
let txtNome;
let txtSigla;
let btnNovo;
let btnSalvar;
let btnExcluir;

function iniciar() {
    
    bodyTabela = document.getElementById( "bodyTabelaEstados" );
    
    form = document.getElementById( "formEstado" );
    txtNome = document.getElementById( "txtNomeEstado" );
    txtSigla = document.getElementById( "txtSiglaEstado" );
    
    btnNovo = document.getElementById( "btnNovoEstado" );
    btnSalvar = document.getElementById( "btnSalvarEstado" );
    btnExcluir = document.getElementById( "btnExcluirEstado" );
    
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
    
    estados = [];
    estadoSelecionado = null;
    
    fetch( "api/estados", {
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
        estados = data._embedded.estados;
        
        estados.forEach( ( estado, indice ) => {
            
            const tr = document.createElement( "tr" );
            tr.dataset.indice = indice;
            
            const tId = document.createElement( "td" );
            tId.innerHTML = estado.id;
            
            const tNome = document.createElement( "td" );
            tNome.innerHTML = estado.nome;
            
            const tSigla = document.createElement( "td" );
            tSigla.innerHTML = estado.sigla;
            
            tr.addEventListener( "click", event => {
                estadoSelecionado = estados[event.target.parentNode.dataset.indice];
                preencherFormulario();
            });
            
            tr.append( tId, tNome, tSigla );
            bodyTabela.append( tr );
            
        });
        
    }).catch( error => {
        alert( error );
    });
    
}

function preencherFormulario() {
    
    txtNome.value = estadoSelecionado.nome;
    txtSigla.value = estadoSelecionado.sigla;
    
}

function resetarFormulario() {
    form.reset();
    estadoSelecionado = null;
}

function salvar() {
    
    let obj = {};
    let metodo;
    let url = "api/estados";
    
    // novo estado
    if ( estadoSelecionado === null ) {
        obj.nome = txtNome.value;
        obj.sigla = txtSigla.value;
        metodo = "POST";
    } else { // alterando estado
        obj.nome = txtNome.value;
        obj.sigla = txtSigla.value;
        metodo = "PATCH";
        url += `/${estadoSelecionado.id}`;
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
    
    if ( estadoSelecionado !== null ) {
        
        if ( confirm( "Deseja mesmo excluir o estado selecionado?" ) ) {

            fetch( `api/estados/${estadoSelecionado.id}`, {
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
        alert( "Escolha um estado para excluir!" );
    }
    
}

iniciar();
