import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { GET_PROGRAMME_BY_ID } from '../graphql/graphql.queries';
import { LoadingService } from '../services/loading.service';
import { Programme } from '../types';

export const programmeResolver: ResolveFn<any> = (route, state): Observable<Programme> => {
  const apollo = inject(Apollo);
  const loading = inject(LoadingService);
  const pid = route.paramMap.get('id');

  if (!pid) {
    throw new Error('Programme ID is required for the Programme Resolver.');
  }

  return apollo.query<Programme>({
    query: GET_PROGRAMME_BY_ID,
    variables: {
      id: pid
    }
  }).pipe(
    map((result) => {
      // Apollo result structure: { data: { postById: Post }, loading: boolean, networkStatus: number }
      if (result.error) {
        // Log or handle errors before returning
        console.error('GraphQL Errors:', result.error);
        throw new Error('Failed to fetch post data.');
      }
      // loading.setLoading(result);
      return result.data;
    })
  )
};
