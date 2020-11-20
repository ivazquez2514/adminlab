import { gql } from '@apollo/client';

export const CABINET_CREATE = gql`
    mutation CabinetCreate (
        $cabinet: CabinetInput!
    ) {
        cabinetCreate(
            cabinet: $cabinet
        ) {
            id
        }
    }
`;