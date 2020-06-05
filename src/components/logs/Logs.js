import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types';

import { getLogs } from '../../actions/logActions';

const Logs = ({ log: { logs, loading }, getLogs }) => {
    useEffect(() => {
        getLogs();
        // eslint-disable-next-line
    }, []);

    if (loading || logs === null) {
        return <Preloader />;
    }

    return (
        <div>
            <ul className='collection with-header'>
                <li className='collection-header'>
                    <h4 className='center'>System Logs</h4>
                </li>
                {!loading && logs.length === 0 ? (
                    <p className='center'>No logs to show</p>
                ) : (
                    logs.map((log) => <LogItem log={log} key={log.id} />)
                )}
            </ul>
        </div>
    );
};

Logs.propTypes = {
    log: PropTypes.object.isRequired,
    getLogs: PropTypes.func.isRequired,
};

// if we want to bring anything from app level state to the component
// we bring it in as a prop
const mapStateToProps = (state) => ({
    log: state.log, // state.log is actually a name from rootReducer that we gave to our reducer
    // we don't need to bring the whole state, we can bring individual props
    // logs: state.log.logs,
    // loading: state.log.loading
});

// we need to add map and actions we use as parameters
export default connect(mapStateToProps, { getLogs })(Logs);
