package br.com.davidbuzatto.exemploidsw.web;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

/**
 * Configurações dos respositórios REST.
 * 
 * @author Prof. Dr. David Buzatto
 */
@Configuration
public class RepositoryRestConfig implements RepositoryRestConfigurer {

    @Autowired
    private EntityManager entityManager;

    @Override
    public void configureRepositoryRestConfiguration( RepositoryRestConfiguration config, CorsRegistry cors ) {
        
        // expõe o ID de TODAS as entidades.
        config.exposeIdsFor(
                entityManager.getMetamodel().getEntities().stream()
                        .map( Type::getJavaType )
                        .toArray( Class[]::new ) );
        
    }

}
