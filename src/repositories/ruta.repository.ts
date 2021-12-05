import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Ruta, RutaRelations, Estacion} from '../models';
import {EstacionRepository} from './estacion.repository';

export class RutaRepository extends DefaultCrudRepository<
  Ruta,
  typeof Ruta.prototype.id,
  RutaRelations
> {

  public readonly origenFK: BelongsToAccessor<Estacion, typeof Ruta.prototype.id>;

  public readonly destinoFK: BelongsToAccessor<Estacion, typeof Ruta.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('EstacionRepository') protected estacionRepositoryGetter: Getter<EstacionRepository>,
  ) {
    super(Ruta, dataSource);
    this.destinoFK = this.createBelongsToAccessorFor('destinoFK', estacionRepositoryGetter,);
    this.registerInclusionResolver('destinoFK', this.destinoFK.inclusionResolver);
    this.origenFK = this.createBelongsToAccessorFor('origenFK', estacionRepositoryGetter,);
    this.registerInclusionResolver('origenFK', this.origenFK.inclusionResolver);
  }
}
