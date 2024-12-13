package br.com.davidbuzatto.exemploidsw.repositorios;

import br.com.davidbuzatto.exemploidsw.entidades.Cidade;
import br.com.davidbuzatto.exemploidsw.projecoes.CidadeInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Prof. Dr. David Buzatto
 */
@RepositoryRestResource( collectionResourceRel = "cidades", path = "cidades", excerptProjection = CidadeInfo.class )
@Transactional
public interface CidadeRepository extends JpaRepository<Cidade, Long> {

    Page<Cidade> findById( @Param( "id" ) Long id, Pageable pageable );
    Page<Cidade> findByNomeContaining( @Param( "nome" ) String nome, Pageable pageable );
    
}
