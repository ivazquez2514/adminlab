import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Roles } from '../../enums';

import {
    MovementsHistory,
    HospitalAreaForm,
    CollaboratorForm,
    CabinetForm,
    CabinetList,
    PatientRecordForm,
    CabinetDetail,
    CollaboratorList,
    HospitalAreaList
} from '../../components';

const Content = ({user}) => {
    return (
        <main className="pt-5 px-3 md:px-0 main-container flex-1">
            <Switch>
                <Route path="/admin/movements-history" component={MovementsHistory} />
                <Route exact path="/admin/hospital-areas" component={HospitalAreaList} />
                <Route path="/admin/hospital-areas/:id" component={HospitalAreaForm} />
                <Route path="/admin/hospital-areas/new" component={HospitalAreaForm} />
                <Route exact path="/admin/collaborators" component={CollaboratorList} />
                <Route path="/admin/collaborators/:id" component={CollaboratorForm} />
                <Route path="/admin/collaborators/new" component={CollaboratorForm} />
                <Route exact path="/admin/cabinets/new" component={CabinetForm} />
                <Route exact path="/admin/cabinets" component={CabinetList} />
                <Route exact path="/admin/cabinets/:id/edit" component={CabinetForm} />
                <Route exact path="/admin/cabinets/:id" component={CabinetDetail} />
                <Route exact path="/admin/patient-records/new" component={PatientRecordForm} />
                <Route exact path="/admin/patient-records/:id" component={PatientRecordForm} />
                <Redirect to={`${user.role === Roles.SuperAdministrador ? '/admin/hospital-areas': '/admin/movements-history'}`} />
            </Switch>
        </main>
    );
}

const mapStateToProps = (st) => ({
    user: st.auth.authenticatedUser
});

export default connect(mapStateToProps)(Content);