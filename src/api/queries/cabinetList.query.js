import { gql } from '@apollo/client';

export const CABINET_LIST = gql`
    query CabinetList {
        cabinetList {
            cabinetNumber
            cabinetType
            rows
            columns
            expedients {
                id
                caseNumber
                lamellaCoordinates {
                  expedientId
                }
                   blockCoordinates {
                  expedientId
                }
            }
        }
    }
`;