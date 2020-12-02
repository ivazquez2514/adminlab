import { gql } from '@apollo/client';

export const AREA_GET = gql`
    query AreaGet(
        $id: String!
    ) {
        areaGet(
            id: $id
        ) {
            id
            name
            usersQuantity
            cabinetLamellasQuantity
            cabinetBlocksQuantity
        }
    }
`;