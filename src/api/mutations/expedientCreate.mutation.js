import { gql } from '@apollo/client';

export const EXPEDIENT_CREATE = gql`
    mutation ExpedientCreate (
        $expedient: ExpedientInput!
    ) {
        expedientCreate(
            expedient: $expedient
        ) {
            id
        }
    }
`;