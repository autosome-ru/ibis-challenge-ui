import {metric_prefix, rank_prefix, SubmitBackendModel, SubmitModel} from "../../models/data.model";


export function convertSubmitsBackendModel(backend: SubmitBackendModel, metricsOrder: string[]): SubmitModel {
  let result: SubmitModel = {
    id: backend.id,
    name: backend.name,
    info: backend.info,
    combinedRank: backend.aggregated_rank,
    team: backend.team
  } as SubmitModel;
  for (let i = 0; i < metricsOrder.length; i++) {
    result[metric_prefix + metricsOrder[i]] = backend.metrics[i]
    result[rank_prefix + metricsOrder[i]] = backend.ranks[i]
  }
  return result;
}
