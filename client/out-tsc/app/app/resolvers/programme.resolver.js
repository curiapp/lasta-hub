import { inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { GET_PROGRAMME_BY_ID } from '../graphql/graphql.queries';
import { LoadingService } from '../services/loading.service';
export const programmeResolver = (route, state) => {
    const apollo = inject(Apollo);
    const loading = inject(LoadingService);
    const pid = route.paramMap.get('id');
    if (!pid) {
        throw new Error('Programme ID is required for the Programme Resolver.');
    }
    return apollo.query({
        query: GET_PROGRAMME_BY_ID,
        variables: {
            id: pid
        }
    }).pipe(map((result) => {
        // Apollo result structure: { data: { postById: Post }, loading: boolean, networkStatus: number }
        if (result.error) {
            // Log or handle errors before returning
            console.error('GraphQL Errors:', result.error);
            throw new Error('Failed to fetch post data.');
        }
        // loading.setLoading(result);
        return result.data;
    }));
};
