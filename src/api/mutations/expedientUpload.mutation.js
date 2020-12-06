import { gql } from '@apollo/client';

export const EXPEDIENT_UPDATE = gql`
    mutation ExpedientUpdate (
        $expedient: ExpedientInput!
    ) {
        expedientUpdate(
            expedient: $expedient
        ) {
            id
        }
    }
`;