import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
    MovementsHistory,
    HospitalAreaForm,
    CollaboratorForm,
    CabinetForm,
    CabinetList
} from '../../components';

const Content = () => {
    return (
        <main className="flex-1 overflow-y-auto py-5 px-3 md:px-0">
            <Switch>
                <Route path="/admin/movements-history" component={MovementsHistory} />
                <Route path="/admin/hospital-areas/new" component={HospitalAreaForm} />
                <Route path="/admin/collaborators/new" component={CollaboratorForm} />
                <Route exact path="/admin/cabinets/new" component={CabinetForm} />
                <Route exact path="/admin/cabinets" component={CabinetList} />
                {/* <Redirect to="/admin/movements-history" /> */}
            </Switch>
        </main>
    );
}

export default Content;