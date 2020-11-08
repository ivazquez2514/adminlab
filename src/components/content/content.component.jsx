import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
    MovementsHistory,
    HospitalAreaForm,
    CollaboratorForm,
    CabinetForm
} from '../../components';

const Content = () => {
    return (
        <main className="flex-1 overflow-y-auto py-5">
            <Switch>
                <Route path="/admin/movements-history" component={MovementsHistory} />
                <Route path="/admin/hospital-areas/new" component={HospitalAreaForm} />
                <Route path="/admin/collaborators/new" component={CollaboratorForm} />
                <Route path="/admin/cabinets/new" component={CabinetForm} />
                <Redirect to="/admin/movements-history" />
            </Switch>
        </main>
    );
}

export default Content;