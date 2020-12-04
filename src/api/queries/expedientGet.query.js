import { gql } from '@apollo/client';

export const EXPEDIENT_GET = gql`
    query ExpedientGet(
        $id: String!
    ) {
        expedientGet(
            id: $id
        ) {
            id
            caseNumber
            lamellaCoordinates {
                expedientId
                cabinetId
                cabinetItems
                row
                column
                third
            }
            blockCoordinates{
                expedientId
                cabinetId
                cabinetItems
                row
                column
                third
            }
        }
    }
`;