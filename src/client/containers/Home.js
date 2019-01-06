import { connect } from '../utils/connect'
import { Home } from '../components/Home'


const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)