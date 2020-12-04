import { gql } from '@apollo/client';

export const CABINET_UPDATE = gql`
    mutation CabinetUpdate (
        $cabinet: CabinetInput!
    ) {
        cabinetUpdate(
            cabinet: $cabinet
        ) {
            id
        }
    }
`;