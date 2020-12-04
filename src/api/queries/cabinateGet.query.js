import { gql } from '@apollo/client';

export const CABINET_GET = gql`
    query CabinetGet(
        $id: String!
    ) {
        cabinetGet(
            id: $id
        ) {
            id
            cabinetNumber
            cabinetType
            rows
            columns
            expedients {
                id
                caseNumber
                lamellaCoordinates {
                    expedientId
                    row
                    column
                    third
                }
                blockCoordinates {
                    expedientId
                    row
                    column
                    third
                }
                createdAt
            }
        }
    }
`;