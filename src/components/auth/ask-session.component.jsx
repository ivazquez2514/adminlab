import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const AskSession = ({user, logout, history}) => {

    console.log(user);

    const getLastInteractionTime = () => {
        const lastInteraction = localStorage.getItem('adminlab-lastInteraction');
        const lastInteracionDate = new Date(new Date(Number(lastInteraction)));
        const differenceInMinutes = (new Date() - lastInteracionDate) / 1000 / 60;

        return differenceInMinutes;
    }

    return (
        <>
            <h4 className="text-3xl font-bold mt-12">Sesión activa</h4>
            <p className="mb-8 font-thin">Si deseas cambiar de usuario, ingresa tus datos correctamente.</p>
            
            <div className="flex flex-col md:flex-row gap-4 h-40" style={{height: '80px'}}>
                <div
                    onClick={() => history.push('/admin')}
                    className="w-full md:w-1/2 h-full">
                    <div className="w-full h-full py-6 md:py-0 flex items-center text-white bg-blue-500 px-4 cursor-pointer rounded-lg">
                        <div className="flex items-center w-full">
                            <div className="flex items-center justify-center text-white text-4xl">
                                <FontAwesomeIcon icon={faUserCircle} />
                            </div>
                            <div className="w-full ml-4 text-white">
                                <p className="text-xl mt-1">{user?.username}</p>
                                <p className="text-sm -mt-1">Último movimiento hace {getLastInteractionTime().toFixed(0)} minutos</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 h-full">
                    <div
                        onClick={() => {
                            logout();
                            console.log('hkjhkj');
                            history.push('/auth');
                        }}
                        className="text-center py-6 md:py-0 w-full h-full flex items-center justify-center bg-white border-2 border-blue-500 text-blue-500 px-4 cursor-pointer rounded-lg text-lg md:text-xl lg:text-2xl font-semibold">
                        Ingresar con otra cuenta
                    </div>
                </div>
            </div>

            <div className="text-center mt-40 w-full">
                <p className="text-white text-lg mt-16 font-light">¿Problemas para entrar? <a className="text-blue-900 font-bold">&nbsp;Contacta al administrador</a></p>
            </div>
        </>
    );
};

const mapPropsToState = (st) => ({
    user: st.auth.authenticatedUser
});

const mapDispatchToState = (dispatch) => ({
    logout: dispatch.auth.logout
});

export default connect(mapPropsToState, mapDispatchToState)(withRouter(AskSession));