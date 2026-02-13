import { Pipe, PipeTransform } from '@angular/core';
import { TutorialStage } from '../types';

@Pipe({
  name: 'searchTutorial',
})
export class SearchTutorialPipe implements PipeTransform {

  transform(stages: TutorialStage[], query: string): TutorialStage[] {
    if (!query) return stages;
    query = query.toLowerCase();
    return stages
      .map(stage => ({
        ...stage,
        processes: stage.processes.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
      }))
      .filter(stage => stage.processes.length > 0 || stage.name.toLowerCase().includes(query));
  }

}
