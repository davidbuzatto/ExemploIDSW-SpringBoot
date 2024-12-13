package br.com.davidbuzatto.exemploidsw.projecoes;

import br.com.davidbuzatto.exemploidsw.entidades.Cidade;
import br.com.davidbuzatto.exemploidsw.entidades.Estado;
import org.springframework.data.rest.core.config.Projection;

/**
 * Projeção para serializar os dados do estado nas cidades.
 * 
 * @author Prof. Dr. David Buzatto
 */
@Projection( name = "CidadeInfo", types = { Cidade.class } )
public interface CidadeInfo {
    
    Long getId();
    String getNome();
    Estado getEstado();
    
}

