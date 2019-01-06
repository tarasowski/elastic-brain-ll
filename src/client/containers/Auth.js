import { connect } from '../utils/connect'
import { Auth } from '../components/Auth'


const mapStateToProps = state => state
const mapDispatchToProps = dispatch => dispatch


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth)