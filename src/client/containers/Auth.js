import { connect } from '../utils/connect'
import { Auth } from '../components/Auth'
import { registerAccount, confirmAccount, loginAccount } from '../actions/index'


const mapStateToProps = state => state.profile
const mapDispatchToProps = dispatch => ({
    onRegisterClick: () => dispatch(registerAccount()),
    onConfirmationClick: () => dispatch(confirmAccount()),
    onLoginClick: () => dispatch(loginAccount())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth)